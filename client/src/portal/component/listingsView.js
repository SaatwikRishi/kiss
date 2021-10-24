import React, { createElement, useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { Comment, Tooltip, Avatar, List, Card, Layout, Select, Tag, Row, Col, Input, Divider, Space, message, Button, Modal, notification, Form } from 'antd';
const { Content } = Layout;
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, CheckOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { InlineReactionButtons } from 'sharethis-reactjs';
import { InlineShareButtons } from 'sharethis-reactjs';
import { InlineFollowButtons } from 'sharethis-reactjs';
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
    const user = useSelector(state => state.user);
    const [state, setState] = useState({ isLoading: true, search: null, searchResult: [] })
    const student = useSelector(state => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comments, setComments] = useState({ isLoading: true, data: [] })
    /** 
     * Scroll to Top
     */
    /*     useEffect(() => {
            if(eventsStore.eventList.loading){
                dispatch(getUser());
                dispatch(getAllEvents());
                dispatch(getCategoryListforEvents());
            }
        }, []); */
    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
        getComments(ListingViewId).then((res) => {
            setComments({ ...state, isLoading: false, data: res })
        })

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

    let categoryList = _(eventsData.categoryList.data).map((rec) => {
        return { name: rec && rec.name, id: rec && rec.catid }
    }).value()
    let eventsList = _(eventsData.eventList.data).map((rec) => { return { ...rec, category: _.find(categoryList, { "id": rec.catid }) } }).value()
    let eventDetails = _.find(eventsList, { "eventid": ListingViewId })
    let desc = eventDetails && eventDetails.event_desc
    //console.log({ categoryList, eventsList, eventDetails, ListingViewId })
    const [loading, setloading] = useState(false);
    const applyForEvent = (eventid, student, eventDetails) => {
        console.log(student);
        if (!student.studentid) {
            navigate('/login');
        } else if (!student.isProfileUpdate) {
            navigate('/profile');
        }
        else if (eventDetails.event_json == '' || eventDetails.event_json == null) {
            setloading(true);
            axios.post(`/events/api/saveStudentEventForm`, {
                data: {
                    form_json: '',
                    eventid: eventDetails.eventid,
                    created_date: moment().format('YYYY-MM-DD'),
                    studentid: student.studentid,
                }
            }).then((res) => {
                setIsModalVisible(false);
                //handleCancel()    
                /*   notification.success({
                      message: 'Success',
                      description: `Application submitted successfully!`
                  }); */
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
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };
    const { TextArea } = Input;

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];
    const [form] = Form.useForm();
    const addComments = (e) => {
        const { comments } = e
        const body = {
            event_id: ListingViewId,
            student_id: user.studentid,
            com_text: comments,
            com_date: `${moment().format('YYYY-MM-DD HH:mm:ss')}`
        }
        axios.post('/api/addComments', body).then((res) => {
            notification.info({
                message: 'Your comments has been sent for moderation. Will update you once the admin review your comments'
            })
            form.resetFields()
        })
    }
    return <>
        <Content className="listingView">
            {!state.isLoading && eventDetails.eventid ?
                <div>
                    <section>
                        <Row gutter={[16, 16]}>
                            <Col sm={24} md={18}>
                                <Card bordered className="details" >
                                    <div className="img" style={{ backgroundImage: `url(${eventDetails.gallery})` }}></div>
                                    <Divider />
                                    <h1>{eventDetails.event_name}</h1>
                                    <Fragment><div className="description" dangerouslySetInnerHTML={{ __html: desc }} /></Fragment>
                                    <Divider>Comments</Divider>
                                    {
                                        !comments.isLoading ?
                                            comments.data.map((rec) =>
                                                <div>
                                                    <Comment
                                                        actions={actions}
                                                        author={<a>{rec.firstname} {rec.lastname}</a>}
                                                        avatar={<Avatar icon={<UserOutlined />} />}
                                                        content={<p>{rec.com_text}</p>}
                                                        datetime={
                                                            <Tooltip title={moment(rec.com_date).format('YYYY-MM-DD HH:mm:ss')}>
                                                                <span>{moment(rec.com_date).fromNow()}</span>
                                                            </Tooltip>
                                                        }
                                                    />
                                                </div>
                                            )
                                            : <LoadingOutlined />
                                    }
                                    <Divider />
                                    <Form form={form} layout="vertical" onFinish={addComments} >
                                        <Form.Item label="Add comments" name="comments" required ><TextArea rows={4} /></Form.Item>
                                        <Form.Item><Button htmlType="submit" type="primary">Add Comment</Button></Form.Item>
                                    </Form>
                                </Card>

                            </Col>
                            <Col sm={24} md={6} className="categories" >
                                <Button type="primary" danger block size="large" loading={loading} disabled={loading} htmlType="submit" 
                                    style={{
                                        background: '#a10d05;', fontSize: 18, borderRadius: '10px 0px 10px 0px', padding: '2px 20px', fontWeight: 700, height: 60, fontSize: '2em', fontWeight: 300,textTransform: 'uppercase'}}
                                        onClick={() => applyForEvent(ListingViewId, student, eventDetails)}>
                                    Apply / Register
                                </Button>
                                <Modal
                                    title={'Please fill the form'}
                                    visible={isModalVisible}
                                    footer={null}
                                    width={800}
                                    onCancel={handleCancel}
                                >
                                    {event_json && <EventDetailsForm {...{ formFields: event_json, eventId: ListingViewId, studentId: student.studentid }} />}
                                </Modal>

                                <EventInfo {...{ info: eventDetails}} />

                                <Card title={<div className="catd_title_right">Similar Events</div>} >
                                    <GetSimmilar eventsData={eventsData} />
                                </Card>
                                <Card title={<div className="catd_title_right">Share</div>} >
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
                                            url: window.location.href, // (defaults to current url)
                                            image: eventDetails.gallery,  // (defaults to og:image or twitter:image)
                                            description: eventDetails.event_desc,       // (defaults to og:description or twitter:description)
                                            title: eventDetails.event_name,          // (defaults to og:title or twitter:title)
                                            message: eventDetails.event_desc,     // (only for email sharing)
                                            subject: "KISS -" + eventDetails.event_name,   // (only for email sharing)
                                            username: 'kalinga.institute' // (only for twitter sharing)
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
                                            url: window.location.href // (defaults to current url)
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
                                            size: 48,             // the size of each button (INTEGER)
                                            spacing: 8            // the spacing between buttons (INTEGER)
                                        }}
                                    />
                                </Card>
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


const GetSimmilar = ({ eventsData }) => {
    const dataSource = _.take(eventsData.eventList.data, 10)
    return (
        <List
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item.gallery} />}
                        title={<Link to={`/listing/${item.eventid}`} title={item.event_name}>{item.event_name}</Link>}
                    />
                </List.Item>
            )}
        />
    )
}

const getComments = async (id) => {
    let comments = await axios.get('/api/getComments/' + id)
    return comments.data && comments.data.result
}


const EventDetailsForm = (props) => {
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
    const onFinish = (e) => {
        let formData = _(e).pickBy(val => val).value();
        setloading(true);
        axios.post(`/events/api/saveStudentEventForm`, {
            data: {
                form_json: formData,
                eventid: eventId,
                created_date: moment().format('YYYY-MM-DD'),
                studentid: studentId,
            }
        }).then(res => {
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


const EventInfo = (props) => {
    const { info = {} } = props;

    let categoryInfo = null;
    let event_json = null;
    try {
        categoryInfo = JSON.parse(info.category_json);
        categoryInfo = categoryInfo ? categoryInfo : [];

        event_json = JSON.parse(info.event_json);
        event_json = event_json ? event_json : []
    } catch (error) {

    }

    const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
    const getHtml = (val) => {
        if (val.includes('http://') || val.includes('https://') || val.includes('www.')) {
            return <a href={val} target="_blank">{val}</a>;
        } else if (moment(val, true).isValid()) {
            return moment(val).format('YYYY-MM-DD');
        } else {
            return val;
        }
    }

    return <>
        <div className="event_details_wrapper" style={{ border: '1px solid #f0f0f0', margin: '10px auto', padding: '20px', borderRadius: '2px'}}>
            <div className="event_des_otherInfo">
                {categoryInfo.map(val => {
                    return Object.keys(val).map(key => <>
                        <div className="event_otherInfo_box" style={{padding: 0}}>
                            <div className="otherInfo_title">{key}</div>
                            <div className="otherInfo_des">
                                <Tooltip title={val[key] ? val[key] : '---'}>{val[key] ? getHtml(val[key]) : '---'}</Tooltip>
                            </div>
                        </div>
                    </>)
                })}
            </div>
        </div>

    </>
}