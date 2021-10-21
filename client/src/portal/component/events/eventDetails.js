import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';

import { Breadcrumb, Card, Layout, Spin, Input,
    Row, Col, Calendar, Divider, Badge, message, Space, Tag, Form  } from 'antd';
import {
    Tabs, Select, Popover, Button, Tooltip,
    Upload, DatePicker, Progress, notification, TimePicker, Modal
} from 'antd';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Content } = Layout;
import { ReconciliationOutlined, 
    CheckOutlined } from '@ant-design/icons';
import _, { remove } from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Kolkata');
import axios from 'axios';


/**
 * Actions 
 */
import {updateUser, getAllEvents, getCategoryListforEvents } from '../../../ngo/store/actions';

/**
 * File upload packages
 */
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from '../../../ngo/components/events/fire';

const EventDetails = (props) => {
    const { eventId } = props;
    const dispatch = useDispatch()
    const eventsStore = useSelector(state => state.events);

    /**
     * get All events Category list from Event store
     */
    useEffect(() => {
        dispatch(getAllEvents());
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

        return {
            categoryList: {
                loading: true,
                data: [],
                ...categoryList
            },
            eventList: {
                loading: true,
                data: [],
                ...eventList
            }
        }
    }
    let eventsData = getEventStoreData();

    /**
     * Loading message
     */
    useEffect(() => {
        eventsData.eventList.loading && message.success("Loading . . .");
    }, [eventsData.eventList.loading])

    /**
     * Selected Date Events
     */
    const [selectedEvent, setselectedEvent] = useState(null);
    const getSelectedDate = (info) => {
        console.log(info);
        setselectedEvent(info);
        setTimeout(() => { document.getElementById('scroll_to_details').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    }

    /**
     * based on eventId show event details
     */
    let eventEditObj = {};
    useEffect(() => {
        if (eventId && eventsData.eventList.loading == false) {
            eventEditObj = _(eventsData.eventList.data).filter(val => val.eventid == eventId).value();
            eventEditObj = eventEditObj.length ? eventEditObj[0] : {};
            if(Object.keys(eventEditObj).length){
                setselectedEvent(eventEditObj);
                setTimeout(() => { document.getElementById('scroll_to_details').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
            }
        } else { }
    }, [eventsData.eventList.data])

    /**
     * Create Event as date List
     */
    const getListData = (value)=> {
        let today = moment(value).format('YYYY-MM-DD');
        let listData = _(eventsData.eventList.data).filter(val=>{
            if (val.start_date && val.end_date){
                return moment(today).isBetween(moment(val.start_date, 'YYYY-MM-DD'), moment(val.end_date, 'YYYY-MM-DD')) || moment(today).isSame(moment(val.start_date, 'YYYY-MM-DD')) || moment(today).isSame(moment(val.end_date, 'YYYY-MM-DD'));
            }
        }).map(val=>{
            return { type: 'success', content: val.event_name, info: val };
        }).value();
        return listData || [];
    }

    /**
     * Calender Cell Rendering
     */
    const monthCellRender = (value)=> { return <p>.</p>; }
    const dateCellRender = (value)=> {
        const listData = getListData(value);
        return <>
            <ul className="calender_events">
                {listData.map(item => (
                    <li key={item.content} className={item.type} onClick={() => getSelectedDate(item.info)}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        </>;
    }

    return <>
        <div className="events_details_wrapper main-content">
            <div className="events_details_calender">
                {eventsData.eventList.loading == false && <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />}
            </div>
        </div>

        <div id="scroll_to_details">
            {selectedEvent && <EventInfo {...{ info: selectedEvent }} />}
        </div>
    </>
}
export default EventDetails;



const EventInfo = (props) =>{
    const { info = {} } = props;

    let categoryInfo = null;
    let event_json = null;
    try {
        categoryInfo = JSON.parse(info.category_json);
        categoryInfo = categoryInfo ? categoryInfo: [];
        
        event_json = JSON.parse(info.event_json);
        event_json = event_json ? event_json : []
    } catch (error) {
        
    }
    
    const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
    const getHtml = (val) =>{
        if (val.includes('http://') || val.includes('https://') || val.includes('www.')) {
            return <a href={val} target="_blank">{val}</a>;
        } else if (moment(val, true).isValid()) {
            return moment(val).format('YYYY-MM-DD');
        }else{
            return val;
        }
    }

    return <>
        <div className="event_details_wrapper">
            <div className="event_title">{info.event_name? info.event_name: '---'}</div>
            <Space>
                {info.tags && _(info.tags.split(',')).map(val => val).value().map(val => <Tag color={_.sample(colors)}>{val}</Tag>)}
            </Space>
            <div className="des_box">
                <div className="des_box_list">
                    <div className="_title">health Care</div>
                    <div className="_value">{info.event_name? info.event_name: '---'}</div>
                </div>
                <div className="des_box_list">
                    <div className="_title">event start date</div>
                    <div className="_value">{info.start_date ? moment(info.start_date).format('YYYY-MM-DD') : '---'}</div>
                </div>
                <div className="des_box_list">
                    <div className="_title">event end date</div>
                    <div className="_value">{info.end_date ? moment(info.end_date).format('YYYY-MM-DD'): '---'}</div>
                </div>
                <div className="des_box_list">
                    <div className="_title">last apply date</div>
                    <div className="_value">{info.apply_date ? moment(info.apply_date).format('YYYY-MM-DD'): '---'}</div>
                </div>
                <div className="des_box_list">
                    <div className="_title">event status</div>
                    <div className="_value activeColor">{
                        moment(info.end_date).isBefore(moment()) ? <Tag color="#2db7f5">Completed</Tag> : <Tag color="#87d068">Active</Tag>
                    }</div>
                </div>
            </div>

            <Divider style={{ margin: '25px 0px 20px 0px' }} />

            <div className="event_des_title">Events Overview</div>
            <div className="event_des_des">{info.event_desc}</div><br />
            
            <div className="event_des_otherInfo">
                {categoryInfo.map(val=>{
                    return Object.keys(val).map(key=><>
                        <div className="event_otherInfo_box">
                            <div className="otherInfo_title">{key}</div>
                            <div className="otherInfo_des">
                                <Tooltip title={val[key] ? val[key] : '---'}>{val[key] ? getHtml(val[key]) : '---'}</Tooltip>
                            </div>
                        </div>
                    </>)
                })}
            </div><br />
            
            {event_json && <EventDetailsForm {...{ formFields: event_json}}/>}

        </div>

    </>
}


const EventDetailsForm = (props) =>{
    const [form] = Form.useForm();
    const { formFields } = props;

    /**
     * state Variables
     * fValue rerender State
    */
    const dateFormat = 'YYYY-MM-DD';
    const [fValue, setfValue] = useState(1);
    const fUpdateTrigger = () => { setfValue(fValue + 1) }

    const [loading, setloading] = useState(false);
    const onFinish = (e) =>{
        console.log(e);
    }

    return <>
        <div className="event_details_form">
            <Form className="initial_form" layout="vertical"
                form={form}
                onFinish={(e) => onFinish(e)}
                initialValues={{
                    ...(() => {
                        return {}
                    })(),
                }}>

                <div className="category_list">
                    {formFields.map(val => {
                        let keyName = val.name.replaceAll(/[ ]/g, '_');
                        let template = '';
                        
                        if (val.input_type == 'text') {
                            template = <div className="category_item">
                                <Form.Item hasFeedback={true} name={keyName} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Input size="middle" style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                        }
                        if (val.input_type == 'dropdown' && val.dropdown) {
                            template = <div className="category_item">
                                <Form.Item hasFeedback={true} name={keyName} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Select size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                        {val.dropdown.map(val => <Option value={val}>{val}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                        }
                        if (val.input_type == 'tags' && val.tags) {
                            template = <div className="category_item">
                                <Form.Item hasFeedback={true} name={keyName} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Select mode="tags" size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                        {val.tags.map(val => <Option value={val}>{val}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                        }
                        if (val.input_type == 'datepicker') {
                            template = <div className="category_item">
                                <Form.Item hasFeedback={true} name={keyName} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                                    <DatePicker format={dateFormat} size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isAfter(moment.now())} />
                                </Form.Item>
                            </div>
                        }
                        if (val.input_type == 'upload') {
                            template = <div className="category_item">
                                <Form.Item hasFeedback={true} name={keyName} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                                    <FireBaseFileUpload {...{ formName: keyName, form, fUpdateTrigger }} />
                                </Form.Item>
                            </div>
                        }
                        return template;
                    })}
                </div>

                <Divider style={{ margin: '20px 0' }} />
                <Space>
                    <Button style={{ color: '#108ee9' }} loading={loading} disabled={loading} icon={<CheckOutlined />} size="large" htmlType="submit"> Submit </Button>
                </Space>
                <br /><br /><br />
            </Form>
        </div>
    </>
}




/**
 * file Upload 
 */

const FireBaseFileUpload = (props) => {
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
            }, (error) => { setrefUrlFile({ ...refUrlFile, progress: 0 }); }, () => {
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
            <a style={{ fontSize: 12, fontWeight: 300, color: '#009688' }} href={refUrlFile.url} target="_blank" title={refUrlFile.url} className="url">{refUrlFile.url}</a>
            {refUrlFile.progress ? <Progress percent={refUrlFile.progress} /> : ''}
        </div>
    </>
}