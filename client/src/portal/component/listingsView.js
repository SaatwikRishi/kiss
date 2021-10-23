import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { Tabs, List, Card, Layout, Select, Tag, Row, Col, Input, Divider, Space, message, Button, Modal, notification, Form } from 'antd';
const { Content } = Layout;
import { ReconciliationOutlined, FormOutlined, CheckOutlined } from '@ant-design/icons';
import { InlineReactionButtons } from 'sharethis-reactjs';
import { InlineShareButtons } from 'sharethis-reactjs';
import { StickyShareButtons } from 'sharethis-reactjs';
import { InlineFollowButtons } from 'sharethis-reactjs';
import ChatBot from 'react-simple-chatbot';
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Kolkata');
import axios from 'axios';
const { Option } = Select;

/**
 * Actions
 */
import { getUser, getAllEvents, getCategoryListforEvents } from '../../ngo/store/actions';

const ListingView = (props) => {
    const ListingViewId = parseInt(props.id)
    const dispatch = useDispatch();
    const location = useLocation();
    const eventsStore = useSelector(state => state.events);
    const [state, setState] = useState({ isLoading: true, search: null, searchResult: [] })
    const student = useSelector(state => state.user); 
    const [isModalVisible, setIsModalVisible] = useState(false);
    /** 
     * Scroll to Top
     */
    useEffect(() => {
        dispatch(getUser());
        dispatch(getAllEvents());
        dispatch(getCategoryListforEvents());
    }, []);
    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    }, [location.pathname])

    /*     useEffect(() => {
            dispatch(getUser());
            dispatch(getAllEvents());
            dispatch(getCategoryListforEvents());
        }, []); */


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
        if (eventsData.eventList.loading) {
            message.success("Loading . . .");
        } else {
            setState({ ...state, isLoading: false })
        }
    }, [eventsData.eventList.loading])
    /**
     * category List and Events count
     */
    /*     let categoryList = _(eventsData.eventList.data).groupBy('catid').value()
    
        categoryList = _(categoryList).map((val, key) => {
            let name = _(eventsData.categoryList.data).filter(v => v.catid == key).value();
            name = name.length ? name[0].name : 'Others';
            return { categoryName: name, data: val }
        }).value() */

    let categoryList = _(eventsData.categoryList.data).map((rec) => { return { name: rec.name, id: rec.catid } }).value()
    let eventsList = _(eventsData.eventList.data).map((rec) => { return { ...rec, category: _.find(categoryList, { "id": rec.catid }) } }).value()
    let eventDetails = _.find(eventsList, { "eventid": ListingViewId })
    let desc = eventDetails && eventDetails.event_desc
    //console.log({ categoryList, eventsList, eventDetails, ListingViewId })
    const [loading, setloading] = useState(false);
    const applyForEvent = (eventid, student, eventDetails) => {
        console.log(student);
        if(!student.studentid) {
            navigate('/login');
        } else if(!student.isProfileUpdate) {
            navigate('/profile');
        }
        else if(eventDetails.event_json=='' || eventDetails.event_json==null) {
            setloading(true);
            axios.post(`/events/api/saveStudentEventForm`, { data: { 
                form_json: '', 
                eventid: eventDetails.eventid, 
                created_date: moment().format('YYYY-MM-DD'),
                studentid: student.studentid,
            }}).then(res => {
                notification.success({
                    message: 'Success',
                    description: `Application submitted successfully!`
                });
            }).finally(() => {
                setloading(false);
            })
        } else {
            showModal();
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    let event_json = null;
    try {        
        event_json = JSON.parse(eventDetails.event_json);
        event_json = event_json ? event_json : []
    } catch (error) {
        
    }

    const steps = [
        {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3',
        },
        {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            trigger: '4',
        },
        {
            id: '4',
            message: 'How may i help you today?',
            trigger: '5',
        },
        {
            id: '5',
            user: true,
            trigger: '5',
        },
        {
            id: '6',
            message: 'Let me see for {previousValue}, just a moment',
            end:true
        },
    ]
    return <>
        <Content style={{ padding: 20 }} className="listingView">
            {!state.isLoading && eventDetails.eventid ?
                <div>
                    <section style={{ marginTop: 20, padding: 20 }}>
                        <Row gutter={[16, 16]}>
                            <Col span={18}>
                                <Card bordered className="details" >
                                    <div className="img" style={{ backgroundImage: `url(${eventDetails.gallery})` }}></div>
                                    <Divider />
                                    <h1>{eventDetails.event_name}</h1>
                                    <Fragment><div className="description" dangerouslySetInnerHTML={{ __html: desc }} /></Fragment>
                                </Card>

                            </Col>
                            <Col span={6} className="categories" >                                
                                <Button type="primary" block size="large" loading={loading} disabled={loading} htmlType="submit" style={{marginBottom: 10}} onClick={()=>applyForEvent(ListingViewId, student, eventDetails)}>Apply / Register</Button>
                                <Modal
                                    title={'Please fill the form'}
                                    visible={isModalVisible} 
                                    footer={null} 
                                    width={800}
                                    onCancel={handleCancel}
                                >
                                    {event_json && <EventDetailsForm {...{ formFields: event_json, eventId: ListingViewId, studentId: student.studentid }}/>}
                                </Modal>
                                <Card title="Similar Events" >
                                    <ul>
                                        <li>CAT A</li>
                                        <li>CAT B</li>
                                        <li>CAT C</li>
                                    </ul>
                                </Card>
                                <Card title="Share" >
                                    <InlineShareButtons
                                        config={{
                                            alignment: 'center',  // alignment of buttons (left, center, right)
                                            color: 'social',      // set the color of buttons (social, white)
                                            enabled: true,        // show/hide buttons (true, false)
                                            font_size: 16,        // font size for the buttons
                                            labels: 'cta',        // button labels (cta, counts, null)
                                            language: 'en',       // which language to use (see LANGUAGES)
                                            networks: [           // which networks to include (see SHARING NETWORKS)
                                                'whatsapp',
                                                'linkedin',
                                                'messenger',
                                                'facebook',
                                                'twitter'
                                            ],
                                            padding: 12,          // padding within buttons (INTEGER)
                                            radius: 4,            // the corner radius on each button (INTEGER)
                                            show_total: true,
                                            size: 40,             // the size of each button (INTEGER)

                                            // OPTIONAL PARAMETERS
                                            url: 'https://localhost:8000/', // (defaults to current url)
                                            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
                                            description: 'custom text',       // (defaults to og:description or twitter:description)
                                            title: 'custom title',            // (defaults to og:title or twitter:title)
                                            message: 'custom email text',     // (only for email sharing)
                                            subject: 'custom email subject',  // (only for email sharing)
                                            username: 'custom twitter handle' // (only for twitter sharing)
                                        }}
                                    />
                                    <Divider />
                                    <InlineReactionButtons
                                        config={{

                                            alignment: 'center',  // alignment of buttons (left, center, right)
                                            enabled: true,        // show/hide buttons (true, false)
                                            language: 'en',       // which language to use (see LANGUAGES)
                                            min_count: 0,         // hide react counts less than min_count (INTEGER)
                                            padding: 12,          // padding within buttons (INTEGER)
                                            reactions: [          // which reactions to include (see REACTIONS)
                                                'slight_smile',
                                                'heart_eyes',
                                                'laughing',
                                                'astonished',
                                                'sob',
                                                'rage'
                                            ],
                                            size: 48,             // the size of each button (INTEGER)
                                            spacing: 8,           // the spacing between buttons (INTEGER)

                                            // OPTIONAL PARAMETERS
                                            url: 'https://localhost:8000/' // (defaults to current url)
                                        }}
                                    />
                                    <Divider />
                                    <InlineFollowButtons
                                        config={{
                                            action: 'Follow us:', // call to action (STRING)
                                            action_enable: true,  // show/hide call to action (true, false)
                                            action_pos: 'bottom', // position of call to action (left, top, right)
                                            alignment: 'center',  // alignment of buttons (left, center, right)
                                            color: 'white',       // set the color of buttons (social, white)
                                            enabled: true,        // show/hide buttons (true, false)
                                            networks: [           // which networks to include (see FOLLOW NETWORKS)
                                                'twitter',
                                                'facebook',
                                                'instagram',
                                                'youtube'
                                            ],
                                            padding: 8,           // padding within buttons (INTEGER)
                                            profiles: {           // social profile links for buttons
                                                twitter: 'sharethis',
                                                facebook: 'sharethis',
                                                instagram: 'sharethis',
                                                youtube: '/channel/UCbM93niCmdc2RD9RZbLMP6A?view_as=subscriber'
                                            },
                                            radius: 9,            // the corner radius on each button (INTEGER)
                                            size: 32,             // the size of each button (INTEGER)
                                            spacing: 8            // the spacing between buttons (INTEGER)
                                        }}
                                    />
                                </Card>
                                <ChatBot steps={steps} />


                            </Col>

                        </Row>
                    </section>
                </div>
                : null
            }

        </Content>

    </>
}
export default ListingView;

const EventDetailsForm = (props) =>{
    const [form] = Form.useForm();
    const { formFields, eventId, studentId } = props;

    /**
     * state Variables
     * fValue rerender State
    */
    const dateFormat = 'YYYY-MM-DD';
    const [fValue, setfValue] = useState(1);
    const fUpdateTrigger = () => { setfValue(fValue + 1) }

    const [loading, setloading] = useState(false);
    const onFinish = (e) =>{
        let formData = _(e).pickBy(val => val).value();
        setloading(true);
        axios.post(`/events/api/saveStudentEventForm`, { data: { 
            form_json: formData, 
            eventid: eventId, 
            created_date: moment().format('YYYY-MM-DD'),
            studentid: studentId,
        }}).then(res => {
            form.resetFields();
            notification.success({
                message: 'Success',
                description: `Application submitted successfully!`
            });
        }).finally(() => {
            setloading(false);
        })
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
                    <Button type="primary" loading={loading} disabled={loading} icon={<CheckOutlined />} size="large" htmlType="submit"> Submit </Button>
                </Space>
                <br /><br /><br />
            </Form>
        </div>
    </>
}
{/* <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <div className="category_card">
                            {categoryList.map(val => <>
                                <div className="category_box">
                                    <div className="category_title"> {val.categoryName}</div>
                                    <div className="category_event_list">
                                        {_(val.data).orderBy('start_date').reverse().take(5).value().map(event => <>
                                            <div className="category_event_box" onClick={() => navigate(`/event/${event.eventid}`)}>
                                                <div className="category_event_name">{event.event_name}</div>
                                                <Space>
                                                    <div className="category_event_start"><ClockCircleOutlined /> Date: <span className="date">{event.start_date && moment(event.start_date).format('YYYY-MM-DD')}</span></div>
                                                    <div className="category_event_start"> -- &nbsp;<span className="date">{event.end_date && moment(event.end_date).format('YYYY-MM-DD')}</span></div>
                                                </Space>
                                            </div>
                                        </>)}
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </Col>
                    <Col span={8}>
                        <Calendar className="calender_box" onSelect={() => { navigate(`/event`) }} fullscreen={false} />
                    </Col>
                </Row> */}