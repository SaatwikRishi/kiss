import React, { useState, useEffect } from 'react'
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

const MyEvents = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const eventsStore = useSelector(state => state.events);
    const [state, setState] = useState({ isLoading: true, search: null, searchResult: [] })
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

    const onSearch = (val) => {
        let searchRec = eventsList.filter(o => Object.keys(o).some(k => String(o[k]).toLowerCase().includes(val.toLowerCase())));
        setState({ ...state, search: val, searchResult: searchRec })
    }
    const onChange = (e) => {
        if (e.target.value === '' || e.target.value === null) {
            setState({ ...state, search: null, searchResult: [] })
        } else {
            setState({ ...state, search: null, searchResult: [] })
        }
    }
    // console.log({ categoryList, eventsList })
    return <>
        <Content className="homePage">
                <section style={{ marginTop: 20 }}>
                    <h1>My Events and Jobs Listings</h1>
                </section>
                
                {!state.isLoading ?
                    <div className="event_list_card">
                        {eventsList.map(item => {
                            let htmlString = item.event_desc || '';
                            var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
                            return <div className="listing">
                                <Link to={`/listing/${item.eventid}`}>
                                    <Card Bordered>
                                        <div className="EventImg">
                                            <div className={`img ${item.gallery == null ? 'blankImg' : ''}`} style={{ backgroundImage: `url(${item.gallery})` }}></div>
                                            <p className="category"><Tag icon={<FormOutlined />} color="#55acee">{item.category.name}</Tag></p>
                                        </div>
                                        <div className="details">
                                            <p className="title">{item.event_name}</p>
                                            <p dangerouslySetInnerHTML={{ __html: stripedHtml }} className="desc" />
                                            <Divider />
                                            <div className="info">
                                                <p className="key"><ClockCircleOutlined /> <strong>Event Date</strong></p>
                                                {
                                                    moment(item.start_date, true).isValid() ? <>
                                                        <p className="value">
                                                            {moment(item.start_date).format('lll')} - {moment(item.end_date).format('lll')}
                                                        </p>
                                                    </> : <p className="value">Yet to announced</p>
                                                }
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        }
                        )}
                    </div>

                    : null
                }
        </Content>



    </>
}
export default MyEvents;