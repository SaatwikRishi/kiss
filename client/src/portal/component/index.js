import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { Breadcrumb, Card, Layout, Spin, Row, Col, Calendar, Divider, Space, message } from 'antd';
const { Content } = Layout;
import { ReconciliationOutlined, FormOutlined, ClockCircleOutlined } from '@ant-design/icons';

/**
 * Actions
 */
import { updateUser, getAllEvents, getCategoryListforEvents } from '../../ngo/store/actions';

const Index = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const eventsStore = useSelector(state => state.events);

    /** 
     * Scroll to Top
     */
    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    }, [location.pathname])

    useEffect(() => {
        dispatch(updateUser());
        dispatch(getAllEvents());
        dispatch(getCategoryListforEvents());
    }, []);


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
     * category List and Events count
     */
    let categoryList = _(eventsData.eventList.data).groupBy('catid').value()
    categoryList = _(categoryList).map((val, key)=>{
        let name = _(eventsData.categoryList.data).filter(v => v.catid == key).value();
        name = name.length ? name[0].name : 'Others';
        return { categoryName: name, data: val }
    }).value()

    return <>
        <Content style={{ padding: 20}}>
            <section>
                <Breadcrumb className="bredcrum_style1">
                    <Breadcrumb.Item>KISS</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Studet Portal</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Dashboard</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </section>
            <section style={{marginTop:20}}>
                <Row gutter={[16,16]}>
                    <Col span={16}>
                        <div className="category_card">
                            {categoryList.map(val=><>
                                <div className="category_box">
                                    <div className="category_title"> {val.categoryName}</div>
                                    <div className="category_event_list">
                                        {_(val.data).orderBy('start_date').reverse().take(5).value().map(event=><>
                                            <div className="category_event_box" onClick={() => navigate(`/event/${event.eventid}`) }>
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
                </Row>
            </section>
        </Content>

    </>
}
export default Index;