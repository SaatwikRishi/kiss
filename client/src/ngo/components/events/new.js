import React, { useState, useEffect, useRef, memo } from 'react'
import { Row, Col, Input, Tabs, Select, Popover, Form, Button, Divider, message, Upload, DatePicker, Space, Progress, notification, TimePicker, Modal } from 'antd';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import {
    SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined, UploadOutlined,
    FileSearchOutlined, AlertOutlined, ContainerOutlined, CreditCardOutlined,
    ArrowRightOutlined, LinkOutlined, UngroupOutlined, ShareAltOutlined,
    ApiOutlined, CalendarOutlined, RotateLeftOutlined,
} from '@ant-design/icons';

import _, { remove } from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('America/Los_Angeles');
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
export const helpNumberFormat = (x) =>  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;

/**
 * Custom Component
 */
import { getCategoryListforEvents } from "../../store/actions";

import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from './fire';

const CreateEvent = memo((props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const eventsStore = useSelector(state => state.events);


    /**
     * get Category list from Event store
     */
    useEffect(() => {
        if (!eventsStore.categoryList){
            dispatch(getCategoryListforEvents());
        } else if (eventsStore.categoryList.loading){
            dispatch(getCategoryListforEvents());
        }
    },[])

    /**
     * getForm data  from Store
     */
    const getEventStoreData = () => {
        let mainObj = eventsStore ? eventsStore: {}
        mainObj = mainObj.categoryList ? mainObj.categoryList : {};
        return {
            categoryList: {
                loading: true,
                data: [],
                ...mainObj
            },
        }
    }
    let eventsData = getEventStoreData();

    
    /**
     * on form Finish
     */
    let formStore = {};
    const [loading, setloading] = useState(false);
    const onFinish = async (e) =>{
        console.log(e);
        let formData = _(e).pickBy(val => val).value();
        setloading(true);
        await axios.post(`/events/api/saveEvents`, { data: formData }).then(res => {
            console.log(res);
        }).finally(() => {
            setloading(false);
        })
    }

    /**
     * form Update for all change
     */
    const [fValue, setfValue] = useState(1);
    const fUpdateTrigger = () => { setfValue(fValue + 1) }

    /**
     * Form Arr
     */
    const [categoryList, setcategoryList] = useState([0]);

    /**
     * remove CategoryList
     */
    const removeCategoryList = (val) => categoryList.length >1 && setcategoryList(_(categoryList).filter(value => value != val).value() );

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
                    <BasicFields {...{ form, fUpdateTrigger, eventsData }} />

                    {form.getFieldValue('catid') && <CategoryForm {...{ form, fUpdateTrigger, eventsData }}  />}

                    <div className="category_dynamic_fields_header">
                        <div className="category_dynamic_title">
                            Dynamic Form fields
                        </div>
                        <div className="category_dynamic_button">
                            <Button icon={<PlusOutlined />} size="large" type="dashed" className="add_dynamicFields_button"
                                onClick={() => {
                                    let next = categoryList.length ? categoryList[categoryList.length - 1] + 1 : 1;
                                    setcategoryList([...categoryList, next])
                                }}> Add </Button>
                        </div>
                    </div>

                    {categoryList.map((formIndex, key) => <>
                        <div className="category_box_wrapper">
                            <div className="category_menu">
                                <div className="category_count"><span>{key + 1}</span></div>
                                {key != 0 && <div className="category_remove" onClick={() => { removeCategoryList(formIndex)}}><DeleteOutlined /></div>}
                            </div>
                            <DynamicFields {...{ form, formIndex, fUpdateTrigger }} />
                        </div>
                    </>)}
                </div>

                <Divider style={{ margin: '20px 0' }} />
                <Space>
                    <Button loading={loading} disabled={loading} icon={<FileSearchOutlined />} size="large" type="primary" htmlType="submit"> Save Form </Button>
                </Space>
            </Form>
        </div>

    </>
})
export default CreateEvent;

/**
 * Sub form box
 */
const BasicFields = (props) =>{
    const { form, fUpdateTrigger, eventsData } = props;
    const dateFormat = 'YYYY-MM-DD';
    
    return <>
        <div className="category_box_basic">
            <div className="category_item">
                <Form.Item hasFeedback={true} name={'event_name'} label="event name" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input size="middle" />
                </Form.Item>
            </div>

            <div className="category_item">
                <Form.Item hasFeedback={true} name={'event_desc'} label="event description" rules={[{ required: false, message: 'Please fill!' }]}>
                    <TextArea rows={3} />
                </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: 25}}>
                <div className="category_item">
                    <Form.Item hasFeedback={true} name={'catid'} label="select category" rules={[{ required: true, message: 'Please fill!' }]}>
                        <Select size="middle" onChange={(e) => { fUpdateTrigger() }} >
                            {eventsData.categoryList.data.map(val => <Option value={val.catid}>{val.name}</Option>)}
                        </Select>
                    </Form.Item>
                </div>
                
                <div className="category_item">
                    <Form.Item hasFeedback={true} name={'end_date'} label="event date" rules={[{ required: false, message: 'Please fill!' }]}>
                        <RangePicker size="middle" format={dateFormat} style={{width: '100%'}} />
                    </Form.Item>
                </div>
            
                <div className="category_item">
                    <Form.Item hasFeedback={true} name={'apply_date'} label="last apply date" rules={[{ required: false, message: 'Please fill!' }]}>
                        <DatePicker size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isAfter(moment.now())} />
                    </Form.Item>
                </div>
                <div className="category_item">
                    <Form.Item hasFeedback={true} name={'document_url'} label="document url" rules={[{ required: false, message: 'Please fill!' }]}>
                        <Input size="middle" style={{ width: '100%' }}/>
                    </Form.Item>
                </div>
            </div>
        </div>
    </>
}

/**
 * Catgory Form
 */
const CategoryForm = (props) =>{
    const { form, fUpdateTrigger, eventsData } = props;

    let catgoryJson = eventsData.categoryList.data || [];
    try {
        catgoryJson = _(catgoryJson).filter(val => val.catid == form.getFieldValue('catid')).value();
        catgoryJson = catgoryJson.length ? catgoryJson[0]: {};
        catgoryJson = JSON.parse(catgoryJson.category_json);
        catgoryJson = catgoryJson ? catgoryJson : [];
        console.log(catgoryJson);
    } catch (error) {
        catgoryJson = [];
    }

    const dateFormat = 'YYYY-MM-DD';
    return <>
        <Divider style={{ margin: '20px 0' }} />
        <div className="category_box_basic" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridGap: 25 }}>

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
                if (val.input_type == 'tags'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['category_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Select mode="tags" size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                {val.dropdown.map(val=> <Option value={val}>{val}</Option> )}
                            </Select>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'datepicker'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['category_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <DatePicker size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isAfter(moment.now())} />
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
 * file Upload 
 */

const FireBaseFileUpload = (props) => {
    const { formKey, formIndex, formName, form, fUpdateTrigger } = props;

    const [refUrlFile, setrefUrlFile] = useState({ progress: 0, url: '' });
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
            <input type="file" onChange={(e) => onRefFileUpload(e)} />
            {/* <span className="url">{refUrlFile.url}</span> */}
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