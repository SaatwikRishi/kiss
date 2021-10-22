import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { Tabs, List, Card, Layout, Spin, Tag, Row, Col, Input, Divider, Space, message, Button } from 'antd';
const { Content } = Layout;
import { ReconciliationOutlined, FormOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment-timezone'
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
    console.log({ categoryList, eventsList, eventDetails, ListingViewId })
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
                                    <Fragment><div className="description" dangerouslySetInnerHTML={{__html:desc}}/></Fragment>
                                </Card>

                            </Col>
                            <Col span={6} className="categories" >
                                <Card >
                                    <ul>
                                        <li>CAT A</li>
                                        <li>CAT B</li>
                                        <li>CAT C</li>
                                    </ul>
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