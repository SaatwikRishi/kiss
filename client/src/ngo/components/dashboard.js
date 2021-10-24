import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm, message  } from 'antd';
import { SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
    FileSearchOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash'
import axios from 'axios';
import moment from 'moment-timezone'
import loading from '../../assets/images/loading.gif'
let lib = require('../../ngo/libs/index')
import ReactHighcharts from 'react-highcharts';
import { getAllEvents, getAllStudentForms } from '../store/actions';

const gridStyle = {
  width: '20%',
  textAlign: 'center',
};

const AdmDashboard = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudentForms());
  },[]);

  
  const eventsData = useSelector(state => state.events);
  useEffect(() => {
    if (!eventsData.eventsList) {
        dispatch(getAllEvents());
    } else if (eventsData.eventsList.loading) {
        dispatch(getAllEvents());
    }
  }, [])

  /**
   * getForm data  from Store
   */
  const getEventStoreData = () => {
      let mainEventsObj = eventsData ? eventsData : {}
      mainEventsObj = mainEventsObj ? mainEventsObj : [];

      return {
          eventList:{
              loading: true,
              eventList:[],
              ...mainEventsObj
          },
      }
  }
  let eventsAllData = getEventStoreData();


  /**
 * Graphs Data Source
 */
    const formsData = useSelector(state => state.forms);
    let data = formsData.list ? formsData.list : [];

    const configTemplate = (categories, series) => {
        let config = {
            chart: {
                zoomType: 'xy',
                height: 360
            },
            time: {
                timezone: 'America/Kolkata'
            },
            title: {
                text: ''
            },

            xAxis: [{
                categories: categories,
                gridLineWidth: 1,
                gridZIndex: 1,
                title: {
                    text: "Events"
                },
            }],
            yAxis: [{
                labels: {
                    format: '{value}',
                    color: '#113984'
                },
                title: {
                    text: "Students Applied"
                },
                opposite: true
            },
            {
                gridLineWidth: 1,
                title: {
                    text: "Students Applied"
                },
                labels: {
                    format: '{value}',
                    color: '#91d5f2'
                }

            }],
            tooltip: {
                split: true
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        borderRadius: 5,
                        backgroundColor: 'rgba(252, 255, 197, 0.7)',
                        borderWidth: 1,
                        borderColor: '#AAA',
                        y: -6
                    }
                }
            },
            series: series,

        }
        return config
    }

    const ReportType = (dataSource, eventsAllData) => {
        var categories = [], series = [], config = {};
        let errorsData = {}
        if(eventsAllData.eventList)
        {
          let eventsList = eventsAllData.eventList.eventList.data;
          eventsList = _(eventsList).sortBy('end_date','desc').value()
          eventsList = eventsList.slice(0, 15)
          let groupedEvent = _(dataSource).groupBy('eventid').value();
          let groupedKeys = Object.keys(groupedEvent);
          let filteredEvent = _(eventsList).filter(val => val.eventid && groupedKeys.indexOf((val.eventid).toString())>-1 ).value();          
          categories = Object.keys(_(filteredEvent).groupBy('event_name').value());
          let grouped = Object.keys(_(filteredEvent).groupBy('eventid').value());
          errorsData = _.map(groupedEvent, (rec, index) => {
            if(grouped.indexOf((groupedEvent[index][0].eventid).toString())>-1)
            {
              return  rec.length ? parseInt(rec.length) : 0;
            }
          })
          errorsData = errorsData.filter(n => n)
        }
        
        series.push({
            "name": "Students Applied",
            "type": "column",
            "yAxis": 1,
            "data": errorsData,
            "color": "#328dd1"
        })
        config = configTemplate(categories, series)
        return config
    }
    let config = ReportType(data, eventsAllData)
  
  return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Dashboard </div>
                <div className="_subTitle">admin pages to manage events and students </div>
            </div>
            <div className="filters"></div>
        </div>
        <ReactHighcharts config={config} />
        <Divider style={{ margin: '20px 0' }} />
        <ReactHighcharts config={config} />
  </>
};

export default AdmDashboard;