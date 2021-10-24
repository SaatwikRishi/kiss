import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, message } from 'antd';
import { ReconciliationOutlined, CheckOutlined } from '@ant-design/icons';
import _, { remove } from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Kolkata');
import { Link, navigate, useLocation } from '@reach/router';
import axios from 'axios';
import { getAllEvents, getCategoryListforEvents } from '../../../ngo/store/actions';

import FullCalendar from '@fullcalendar/react' // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timegridPlugin from '@fullcalendar/timegrid';
import ineraton from '@fullcalendar/common'




const EventDetails = (props) => {
    const calendarEl = useRef(null);
    const { eventId } = props;
    const dispatch = useDispatch()
    const eventsStore = useSelector(state => state.events);
    const [state, setState] = useState({ isLoading: true })
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
    const generateRandomColor=()=>{
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
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
    useEffect(() => {
        if (eventsData.eventList.loading) {
            message.success("Loading . . .");
        } else {
            setState({ ...state, isLoading: false })
        }
    }, [eventsData.eventList.loading])
    const events=_.map(eventsData.eventList.data,(rec)=>{ 
        return { 
            interactive:true, 
            id:rec.eventid,title:rec.event_name, 
            start:rec.start_date, 
            end:rec.end_date, 
            backgroundColor:generateRandomColor()
        }
    })
    return <>
        <div className="calenderView">
            {!state.isLoading ?
                <section className="calenderView">
                    
                    <FullCalendar          

                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,listWeek'
                        }}
                        dateClick={(info)=>{
                            alert('Clicked on: ' + info.dateStr);
                            alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                            alert('Current view: ' + info.view.type);
                            // change the day's background color just for fun
                            info.dayEl.style.backgroundColor = 'red';
                        }}
                        plugins={[listPlugin, dayGridPlugin, timegridPlugin]}
                        initialView="dayGridMonth"
                        events={events} eventClick={(e)=>{
                            // console.log(e.event.id)
                            navigate("/event/" + e.event.id)
                        }}
                        /* events={[{}]} */
                    />

                </section>
                : null
            }
        </div>
    </>
}
export default EventDetails;


