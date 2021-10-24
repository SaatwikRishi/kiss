import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { Breadcrumb, Card, Layout, Spin, Row, Col, Calendar, Divider, Space, message, Tabs, Radio, List, Avatar, Tag  } from 'antd';
import { ReconciliationOutlined, FormOutlined, ClockCircleOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TabPane } = Tabs;

/**
 * Actions
 */
import { updateUser, getAllEvents, getCategoryListforEvents } from '../../ngo/store/actions';

const Index = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const eventsStore = useSelector(state => state.events);

    const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
    );
      

    /** 
     * Scroll to Top
     */
    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    }, [location.pathname])

/*     if(eventsStore.eventList.loading){
        dispatch(getUser());
        dispatch(getAllEvents());
        dispatch(getCategoryListforEvents());
    } */


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

    console.log(categoryList);

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
                    <Col span={24}>
                        <Tabs tabPosition={'left'}>
                        {categoryList.map(function(item, index){
                            return <>
                                <TabPane tab={item.categoryName} key={index+1}>
                                    {item.data.length>0 ?
                                        <>
                                            <List
                                                itemLayout="vertical"
                                                size="large"
                                                pagination={{
                                                onChange: page => {
                                                    console.log(page);
                                                },
                                                pageSize: 20,
                                                }}
                                                dataSource={item.data}
                                                footer={null}
                                                renderItem={event => (
                                                <List.Item
                                                    key={event.event_name}
                                                    actions={[
                                                    <><span>Last Date: <span className="date">{event.apply_date && moment(event.apply_date).format('YYYY-MM-DD')}</span></span></>,
                                                    <><span>
                                                        {event.tags && event.tags.split(',').map(function(tag){
                                                            return <><Tag color="#2db7f5">{tag}</Tag></>
                                                        })}
                                                    </span></>,
                                                    ]}
                                                    extra={
                                                    <img
                                                        width={272}
                                                        alt="logo"
                                                        src={event.gallery}
                                                    />
                                                    }
                                                >
                                                    <List.Item.Meta
                                                    title={<a href={'/event/'+event.eventid}>{event.event_name}</a>}
                                                    description={
                                                        <>
                                                           <div className="category_event_start"><ClockCircleOutlined /> Date: <span className="date">{event.start_date && moment(event.start_date).format('YYYY-MM-DD')}</span> - &nbsp;<span className="date">{event.end_date && moment(event.end_date).format('YYYY-MM-DD')}</span></div> 
                                                        </>
                                                    }
                                                    />
                                                    {
                                                        <>
                                                            <p>{event.event_desc}</p>
                                                            {(event.document_url)?<><p><a href={event.document_url} target={'_blank'}>{event.document_url}</a></p></>:''}                                                            
                                                        </>
                                                    }
                                                </List.Item>
                                                )}
                                            />
                                        </>
                                    :'' }
                                </TabPane>
                            </>
                        })}
                        </Tabs>
                    </Col>
                </Row>
            </section>
        </Content>

    </>
}
export default Index;