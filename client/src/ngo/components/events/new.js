import React, { useState, useEffect, useRef, memo } from 'react'
import { Row, Col, Input, Tabs, Select, Popover, Form, Button, Divider, 
    message, Upload, DatePicker, Space, Progress, notification, TimePicker, Modal } from 'antd';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import {
    SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined, UploadOutlined, Tooltip,
    FileSearchOutlined, AlertOutlined, ContainerOutlined, CreditCardOutlined,
    ArrowRightOutlined, LinkOutlined, UngroupOutlined, ShareAltOutlined,
    ApiOutlined, CalendarOutlined, RotateLeftOutlined,
} from '@ant-design/icons';

import _, { remove } from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Kolkata');
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
export const helpNumberFormat = (x) =>  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;

/**
 * Editor Textarea
 */
 import ReactQuill from 'react-quill';
 import 'react-quill/dist/quill.snow.css';

/**
 * Custom Component
 */
import { getCategoryListforEvents, getAllEvents, getAllTags } from "../../store/actions";

import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from './fire';


const CreateEvent = (props) => {
    const { eventId = null } = props;
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const eventsStore = useSelector(state => state.events);
    const user = useSelector(state => state.user);

    /**
     * state Variables
     * fValue rerender State
     */
    const [fValue, setfValue] = useState(1);
    const fUpdateTrigger = () => { setfValue(fValue + 1) }
    const [dynamicFieldList, setdynamicFieldList] = useState([0]);

    /**
     * get All events Category list from Event store
     */
    useEffect(() => {
        dispatch(getAllEvents());
        dispatch(getAllTags());
    }, []);
    useEffect(() => {
        if (!eventsStore.categoryList) {
            dispatch(getCategoryListforEvents());
        } else if (eventsStore.categoryList.loading) {
            dispatch(getCategoryListforEvents());
        }
    }, [])

    /**
     * getForm data  from Store
     */
    const getEventStoreData = () => {
        let mainObj = eventsStore ? eventsStore : {}
        
        let categoryList = mainObj.categoryList ? mainObj.categoryList : {};
        let eventList = mainObj.eventList ? mainObj.eventList : {};
        let tagList = mainObj.tagList ? mainObj.tagList : {};

        return {
            categoryList: {
                loading: true,
                data: [],
                ...categoryList
            },
            eventList:{
                loading: true,
                data:[],
                ...eventList
            },
            tagList:{
                loading: true,
                data:[],
                ...tagList
            }
        }
    }
    let eventsData = getEventStoreData();

    /**
     * based on eventId check edit mode or not
     * if setForm data
     */
    const [eventDesc, seteventDesc] = useState('');
    let eventEditObj = {};
    useEffect(() => {
        if (eventId && eventsData.eventList.loading == false) {
            eventEditObj = _(eventsData.eventList.data).filter(val => val.eventid == eventId).value();
            eventEditObj = eventEditObj.length ? eventEditObj[0] : {};
            if (Object.keys(eventEditObj).length == 0) {
                message.warning(`No records fount for this ID : ${eventId}`);
                navigate('/admin/events/list');
            } else {
                seteventDesc(eventEditObj.event_desc);
                eventEditObj = _(eventEditObj).pickBy(val => val).value();

                let formInit = {
                    ...eventEditObj,
                    ...(() => {
                        if (eventEditObj.tags) {
                            return { tags: eventEditObj.tags.split(",") }
                        }
                    })(),
                    ...(() => {
                        if (eventEditObj.apply_date) {
                            return { apply_date: moment(eventEditObj.apply_date) }
                        }
                    })(),
                    ...(() => {
                        if (eventEditObj.start_date && eventEditObj.end_date) {
                            return { end_date: [moment(eventEditObj.start_date), moment(eventEditObj.end_date)] }
                        }
                    })(),
                    ...(() => {
                        if (eventEditObj.category_json) {
                            try {
                                let category_json = JSON.parse(eventEditObj.category_json);
                                category_json = category_json ? category_json : null;
                                if (Array.isArray(category_json)) {
                                    category_json = _.map(category_json, obj => {
                                        var temp = {}; _.forOwn(obj, function (value, key) {
                                            temp[key] = moment(value, true).isValid() ? moment(value) : value
                                        });
                                        return temp;
                                    })
                                    return { category_json: category_json }
                                }
                            } catch (error) { }
                        }
                    })(),
                    ...(() => {
                        if (eventEditObj.event_json) {
                            try {
                                let event_json = JSON.parse(eventEditObj.event_json);
                                event_json = event_json && event_json.length ? event_json : null;
                                if (event_json) {
                                    return { event_json: event_json }
                                }
                            } catch (error) { }
                        }
                    })(),
                };
                formInit.event_json && formInit.event_json.length && setdynamicFieldList(Array.from({ length: formInit.event_json.length }, (val, key) => key));
                form.setFieldsValue(formInit);
            }
        } else { }
    }, [eventsData.eventList.data, eventDesc])    
    
    const [EditorValid, setEditorValid] = useState(true);
    const [EditorVal, setEditorVal] = useState(eventDesc);
    const dateFormat = 'YYYY-MM-DD';

    useEffect(() => {
        setEditorVal(eventDesc);
    }, [eventDesc])
    
    /**
     * on form Finish
     */
    let formStore = {};
    const [loading, setloading] = useState(false);
    const onFinish = async (e) =>{
        console.log(e);
        let formData = _(e).pickBy(val => val).value();
        setloading(true);
        await axios.post(`/events/api/saveEvents`, { data: { 
            ...formData, 
            created_by: user.username, 
            created_date: moment().format('YYYY-MM-DD'),
            event_desc: EditorVal,
            ...(() => {
                return eventId !=null ? { eventid: parseInt(eventId) } : {}
            })(),
        }}).then(res => {
            console.log(res);
            if(res.data.result.error) {
                message.error(`Failed to add event, please try again!`);
            } else {
                message.success("Event Created Successfully");
                dispatch(getAllEvents());
            }
            window.location.href = "/admin/events/list";
        }).finally(() => {
            setloading(false);
        })
    }

    /**
     * remove CategoryList
     */
    const removeCategoryList = (val) => setdynamicFieldList(_(dynamicFieldList).filter(value => value != val).value() );

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Create Events </div>
                <div className="_subTitle">create event with necessary information</div>
            </div>
            <div className="filters"></div>
        </div>
        <Divider style={{ margin: '20px 0' }} />


        <div className="category_creation" style={{ minHeight: '80vh'}}>
            <Form className="initial_form" layout="vertical"
                form={form}
                onFinish={(e) => onFinish(e)}
                initialValues={{
                    ...(() => {
                        return {
                            ...formStore,
                        }
                    })(),
                }}>
                
                <div className="category_list">
                    <div className="category_box_basic bgwhite20">
                        <div className="category_item">
                            <Form.Item hasFeedback={true} name={'event_name'} label="event name" rules={[{ required: true, message: 'Please fill!' }]}>
                                <Input size="middle" />
                            </Form.Item>
                        </div>            
                        <div className="category_item">
                            <Form.Item hasFeedback={true} name={'event_desc'} label="event description" rules={[{ required: EditorValid, message: 'Please fill!' }]}>
                                <TextEditor setEditorValid={setEditorValid} setEditorVal={setEditorVal} EditorVal={EditorVal} />
                            </Form.Item>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '10px 25px', marginTop: 50}}>
                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'catid'} label="select category" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Select size="middle" onChange={(e) => { fUpdateTrigger() }} >
                                        {eventsData.categoryList.data.map(val => <Option value={val.catid}>{val.name}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'tags'} label="select Tags" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Select mode="tags" size="middle" onChange={(e) => {  }} >
                                        {eventsData.tagList && eventsData.tagList.data.map(val => <Option value={val.tag}>{val.tag}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                            
                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'end_date'} label="event date" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <RangePicker format={dateFormat} size="middle" style={{ width: '100%' }} disabledDate={val => moment(val).isBefore(moment.now())} />
                                </Form.Item>
                            </div>
                        
                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'apply_date'} label="last apply date" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <DatePicker format={dateFormat} size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isBefore(moment.now())} />
                                </Form.Item>
                            </div>
                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'document_url'} label="document url" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <Input size="middle" style={{ width: '100%' }}/>
                                </Form.Item>
                            </div>
                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'gallery'} label="Event Image" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <FireBaseGalleryFileUpload {...{ formName: 'gallery', form, fUpdateTrigger }} />
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    {form.getFieldValue('catid') && <CategoryForm {...{ form, fUpdateTrigger, eventsData }}  />}

                    <div className="category_dynamic_fields_header">
                        <div className="category_dynamic_title">
                            Dynamic Form fields
                        </div>
                        <div className="category_dynamic_button">
                            <p style={{ color: '#1890ff', marginBottom: 0, fontSize: '1.1em', cursor: 'pointer' }} onClick={() => {
                                let next = dynamicFieldList.length ? dynamicFieldList[dynamicFieldList.length - 1] + 1 : 1;
                                setdynamicFieldList([...dynamicFieldList, next])
                            }}>+ Add Row </p>
                        </div>
                    </div>
                    
                    <div>
                        {dynamicFieldList.map((formIndex, key) => <>
                            <div className="category_box_wrapper">
                                <div className="category_menu">
                                    <div className="category_count"><span>{key + 1}</span></div>
                                    <div className="category_remove" onClick={() => { removeCategoryList(formIndex)}}><DeleteOutlined /></div>
                                </div>
                                <DynamicFields {...{ form, formIndex, fUpdateTrigger }} />
                            </div>
                        </>)}
                    </div>
                </div>

                <Divider style={{ margin: '20px 0' }} />
                <Space>
                    <Button loading={loading} disabled={loading} icon={<FileSearchOutlined />} size="large" type="primary" htmlType="submit"> Save Form </Button>
                </Space>
                <br /><br /><br />
            </Form>
        </div>

    </>
}
export default CreateEvent;

/**
 * Catgory Form
 */
const CategoryForm = (props) =>{
    const { form, fUpdateTrigger, eventsData } = props;

    let catgoryJson = eventsData.categoryList.data || [];
    let title = '';
    try {
        catgoryJson = _(catgoryJson).filter(val => val.catid == form.getFieldValue('catid')).value();
        catgoryJson = catgoryJson.length ? catgoryJson[0]: {};
        title = catgoryJson.name ? catgoryJson.name: '';
        catgoryJson = JSON.parse(catgoryJson.category_json);
        catgoryJson = catgoryJson ? catgoryJson : [];
    } catch (error) {
        catgoryJson = [];
    }

    const dateFormat = 'YYYY-MM-DD';
    return <>
        {/* <Divider style={{ margin: '20px 0' }} /> */}
        <div className="category_dynamic_fields_header">
            <div className="category_dynamic_title">
                {title ? 'Category : ' + title: ''}
            </div>
            <div className="category_dynamic_button"></div>
        </div>
        <div className="category_box_basic bgwhite20" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridGap: 25}}>
            {catgoryJson.map(val=>{
                let template = '';
                if (val.input_type == 'text'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['category_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Input size="middle" style={{ width: '100%' }}/>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'dropdown'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['category_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Select size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                {val.dropdown.map(val=> <Option value={val}>{val}</Option> )}
                            </Select>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'tags' && val.tags){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['category_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Select mode="tags" size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                {val.tags.map(val=> <Option value={val}>{val}</Option> )}
                            </Select>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'datepicker'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['category_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <DatePicker format={dateFormat} size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isAfter(moment.now())} />
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'upload'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['category_json', 0, val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <FireBaseFileUpload {...{ formKey: 'category_json', formIndex: 0, formName: val.name, form, fUpdateTrigger }} />
                        </Form.Item>
                    </div>
                }
                return template;
            })}
        </div>
    </>
}

/**
 * Galerry file Upload 
 */
const FireBaseGalleryFileUpload = (props) => {
    const { formName, form, fUpdateTrigger } = props;

    const [refUrlFile, setrefUrlFile] = useState({ progress: 0, url: form.getFieldValue(formName) });
    const onRefFileUpload = (e) => {

        let file = e.target.files[0];
        const storageRef = ref(storage, file.name ? 'events/' + file.name : 'events/ref_lini');
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setrefUrlFile({ ...refUrlFile, progress: progress });
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        setrefUrlFile({ ...refUrlFile, progress: progress < 6 ? 5 : progress });
                        break;
                }
            }, (error) => { setrefUrlFile({ ...refUrlFile, progress: 0 }); },() => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setrefUrlFile({ ...refUrlFile, url: downloadURL });

                    /**
                     * update value to form
                     */
                    let temp = _.cloneDeep(form.getFieldsValue());
                    temp[formName] = downloadURL;
                    form.setFieldsValue(temp);
                    fUpdateTrigger();
                });
            }
        );
    }
    return <>
        <div className="file_upload_custom">
            <Input type="file" size="middle" onChange={(e) => onRefFileUpload(e)} />
            <a style={{ fontSize: 12, fontWeight: 300, color: '#009688'}} href={form.getFieldValue(formName)} target="_blank" title={form.getFieldValue(formName)} className="url">{form.getFieldValue(formName)}</a>
            {refUrlFile.progress ? <Progress percent={refUrlFile.progress} /> : ''}
        </div>
    </>
}

/**
 * file Upload 
 */
const FireBaseFileUpload = (props) => {
    const { formKey, formIndex, formName, form, fUpdateTrigger } = props;

    const [refUrlFile, setrefUrlFile] = useState({ progress: 0, url: form.getFieldValue([formKey, formIndex, formName]) });
    const onRefFileUpload = (e) => {

        let file = e.target.files[0];
        const storageRef = ref(storage, file.name ? 'events/' + file.name : 'events/ref_lini');
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setrefUrlFile({ ...refUrlFile, progress: progress });
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        setrefUrlFile({ ...refUrlFile, progress: progress < 6 ? 5 : progress });
                        break;
                }
            }, (error) => { setrefUrlFile({ ...refUrlFile, progress: 0 }); },() => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setrefUrlFile({ ...refUrlFile, url: downloadURL });

                    /**
                     * update value to form
                     */
                    let temp = _.cloneDeep(form.getFieldsValue());
                    temp[formKey][formIndex][formName] = downloadURL;
                    form.setFieldsValue(temp);
                    fUpdateTrigger();
                });
            }
        );
    }
    return <>
        <div className="file_upload_custom">
            <Input type="file" size="middle" onChange={(e) => onRefFileUpload(e)} />
            <a style={{ fontSize: 12, fontWeight: 300, color: '#009688'}} href={refUrlFile.url} target="_blank" title={refUrlFile.url} className="url">{refUrlFile.url}</a>
            {refUrlFile.progress ? <Progress percent={refUrlFile.progress} /> : ''}
        </div>
    </>
}

/**
 * Sub form box
 */
const DynamicFields = (props) =>{
    const { form, formIndex, fUpdateTrigger } = props;

    return <>
        <div className="category_box">
            <div className="category_item">
                <Form.Item  hasFeedback={true} name= {['event_json', formIndex ,'name']} label="name" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input size="middle" onChange={(e) => { fUpdateTrigger() }} />
                </Form.Item>
            </div>

            <div className="category_item">
                <Form.Item  hasFeedback={true} name= {['event_json', formIndex ,'input_type']} label="input type" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Select size="middle" onChange={(e) => { fUpdateTrigger() }} >
                        <Option value="text">text</Option>
                        <Option value="dropdown">dropdown</Option>
                        <Option value="tags">tags</Option>
                        <Option value="upload">file upload</Option>
                        <Option value="datepicker">datepicker</Option>
                    </Select>
                </Form.Item>
            </div>

            {form.getFieldValue(['event_json', formIndex, 'input_type']) == 'dropdown' && <FormDropdown {...{ fUpdateTrigger, formIndex }} />}
            {form.getFieldValue(['event_json', formIndex, 'input_type']) == 'tags' && <FormTags {...{ fUpdateTrigger, formIndex }} />}

        </div>
    </>
}

/**
 * dropdown Field
 */
const FormDropdown = (props) =>{
    const { fUpdateTrigger, formIndex } = props;
    
    return <>
        <div className="category_item">
            <Form.Item  hasFeedback={true} name={['event_json', formIndex, 'dropdown']} label="dropdown values" rules={[{ required: true, message: 'Please fill!' }]}>
                <Select mode="tags" allowClear size="middle" onChange={(e) => { fUpdateTrigger() }} > </Select>
            </Form.Item>
        </div>
    </>
}

/**
 * tag Field
 */
const FormTags = (props) => {
    const { fUpdateTrigger, formIndex } = props;

    return <>
        <div className="category_item">
            <Form.Item hasFeedback={true} name={['event_json', formIndex, 'tags']} label="tag values" rules={[{ required: true, message: 'Please fill!' }]}>
                <Select mode="tags" allowClear size="middle" onChange={(e) => { fUpdateTrigger() }} > </Select>
            </Form.Item>
        </div>
    </>
}

const TextEditor = (props) =>{
    const { EditorVal } = props;
    console.log(EditorVal);
    const OnChange = (value) => {
      let editorval = ((value.trim()=='' || value=='<p><br></p>')?true:false)
      props.setEditorValid(editorval)
      props.setEditorVal(value)
    }
  
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'code'],
        ['clean'],
      ],
    };
    
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'code',
    ];
    
    return <>
        <ReactQuill
          theme="snow"
          value={EditorVal || ''}
          modules={modules}
          formats={formats}
          onChange={OnChange}
          style={{height: '150px'}}
        />
      </>
  };