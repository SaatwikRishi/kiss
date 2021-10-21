import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';

import { Breadcrumb, Card, Layout, Spin, Row, Col, Calendar, Divider, Badge  } from 'antd';
const { Content } = Layout;
import { ReconciliationOutlined, FormOutlined } from '@ant-design/icons';
import _, { remove } from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('America/Los_Angeles');
var momentRange = require('moment-range');
momentRange.extendMoment(moment);

import axios from 'axios';

/**
 * Actions 
 */
import {updateUser, getAllEvents, getCategoryListforEvents } from '../../../ngo/store/actions';

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
     * based on eventId check edit mode or not
     * if setForm data
     */
    let eventEditObj = {};
    useEffect(() => {
        if (eventId && eventsData.eventList.loading == false) {
            eventEditObj = _(eventsData.eventList.data).filter(val => val.eventid == eventId).value();
            eventEditObj = eventEditObj.length ? eventEditObj[0] : {};
        } else { }
    }, [eventsData.eventList.data])

    const getListData = (value)=> {
        let today = moment(value).format('YYYY-MM-DD');
        let listData = _(eventsData.eventList.data).filter(val=>{
            if (val.start_date && val.end_date){
                return moment(today).isBetween(moment(val.start_date, 'YYYY-MM-DD'), moment(val.end_date, 'YYYY-MM-DD')) || moment(today).isSame(moment(val.start_date, 'YYYY-MM-DD'));
            }
        }).map(val=>{
            return { type: 'success', content: val.event_name };
        }).value();
        return listData || [];
    }

    const dateCellRender = (value)=> {
        const listData = getListData(value);
        return <>
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        </>;
    }

    const monthCellRender = (value)=> {
        return <p>.</p>;
    }

    return <>
        <div className="events_details_wrapper main-content">
            <div className="events_details_calender">
                {eventsData.eventList.loading == false && <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />}
            </div>
        </div>

    </>
}
export default EventDetails;