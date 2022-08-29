import React, {useEffect, memo, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, navigate} from '@reach/router';
import {
  Breadcrumb,
  Table,
  Input,
  Space,
  Form,
  Select,
  Button,
  Card,
  DatePicker,
  Typography,
  Row,
  Col,
  Divider,
  Alert,
  InputNumber,
  Popconfirm,
  message,
} from 'antd';
import {
  SafetyCertificateTwoTone,
  ContainerOutlined,
  FormOutlined,
  TeamOutlined,
  SolutionOutlined,
  ProfileOutlined,
  CommentOutlined,
  FundOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment-timezone';
import loading from '../../assets/images/loading.gif';
let lib = require('../../ngo/libs/index');
import ReactHighcharts from 'react-highcharts';
import {
  getAllEvents,
  getAllStudents,
  getAllComments,
  getAllStudentForms,
} from '../store/actions';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};
const {RangePicker} = DatePicker;

const AdmDashboard = props => {
  // Modified By Saatwik
  const getData = async () => {
    const events = await getAllEvents();
    const students = await getAllStudents();
    const comments = await getAllComments();
    const forms = await getAllStudentForms();
    return {events, students, comments, forms};
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getData().then(e => {
      dispatch(e.events);
      dispatch(e.students);
      dispatch(e.comments);
      dispatch(e.forms);
    });
  }, []);

  const eventsData = useSelector(state => state.events);
  const studentsList = useSelector(state => state.students);
  console.log(studentsList);
  useEffect(() => {
    if (!eventsData.eventsList) {
      dispatch(getAllEvents());
    } else if (eventsData.eventsList.loading) {
      dispatch(getAllEvents());
    }
  }, []);

  /**
   * getForm data  from Store
   */
  const getEventStoreData = () => {
    let mainEventsObj = eventsData ? eventsData : {};
    mainEventsObj = mainEventsObj ? mainEventsObj : [];

    return {
      eventList: {
        loading: true,
        eventList: [],
        ...mainEventsObj,
      },
    };
  };
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
        height: 360,
      },
      time: {
        timezone: 'America/Kolkata',
      },
      title: {
        text: '',
      },

      xAxis: [
        {
          categories: categories,
          gridLineWidth: 1,
          gridZIndex: 1,
          title: {
            text: 'Events',
          },
        },
      ],
      yAxis: [
        {
          labels: {
            format: '{value}',
            color: '#113984',
          },
          title: {
            text: 'Students Applied',
          },
          opposite: true,
        },
        {
          gridLineWidth: 1,
          title: {
            text: 'Students Applied',
          },
          labels: {
            format: '{value}',
            color: '#91d5f2',
          },
        },
      ],
      tooltip: {
        split: true,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            borderRadius: 5,
            backgroundColor: 'rgba(252, 255, 197, 0.7)',
            borderWidth: 1,
            borderColor: '#AAA',
            y: -6,
          },
        },
      },
      series: series,
    };
    return config;
  };

  const ReportType = (dataSource, eventsAllData) => {
    var categories = [],
      series = [],
      config = {};
    let errorsData = {};
    if (eventsAllData.eventList) {
      let eventsList = eventsAllData.eventList.eventList.data;
      eventsList = _(eventsList)
        .sortBy('end_date', 'desc')
        .value();
      eventsList = eventsList.slice(0, 15);
      let groupedEvent = _(dataSource)
        .groupBy('eventid')
        .value();
      let groupedKeys = Object.keys(groupedEvent);
      let filteredEvent = _(eventsList)
        .filter(
          val => val.eventid && groupedKeys.indexOf(val.eventid.toString()) > -1
        )
        .value();
      categories = Object.keys(
        _(filteredEvent)
          .groupBy('event_name')
          .value()
      );
      let grouped = Object.keys(
        _(filteredEvent)
          .groupBy('eventid')
          .value()
      );
      errorsData = _.map(groupedEvent, (rec, index) => {
        if (grouped.indexOf(groupedEvent[index][0].eventid.toString()) > -1) {
          return rec.length ? parseInt(rec.length) : 0;
        }
      });
      errorsData = errorsData.filter(n => n);
    }

    series.push({
      name: 'Students Applied',
      type: 'column',
      yAxis: 1,
      data: errorsData,
      color: '#328dd1',
    });
    config = configTemplate(categories, series);
    return config;
  };
  let config = ReportType(data, eventsAllData);

  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  const _linkClass = {
    color: 'DodgerBlue',
    padding: '10px',
    fontFamily: 'Arial',
    fontSize: 24,
    textAlign: 'center',
  };

  const commentsData = useSelector(state => state.comments);

  let eventslength = eventsAllData.eventList
    ? eventsAllData.eventList.eventList.data.length
    : 0;
  let studentslength = studentsList.loading ? studentsList.list.length : 0;
  let formslength = data ? data.length : 0;
  let commentslength = commentsData.loading ? commentsData.list.length : 0;
  const dateFormat = 'YYYY-MM-DD';

  return (
    <>
      <div className="_apifilter_subheader">
        <div className="_details">
          <div className="_title">
            {' '}
            <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Dashboard{' '}
          </div>
          <div className="_subTitle">
            admin pages to manage events and students{' '}
          </div>
        </div>
        <div className="filters"></div>
      </div>
      <div className="_admin_body">
        <Divider style={{margin: '20px 0px'}} />
        <Row className="rowclass">
          <Col span={24}>
            <h2>Recent Events vs Students Registration</h2>
            <RangePicker
              format={dateFormat}
              size="middle"
              style={{width: '20%', float: 'right'}}
            />
            <ReactHighcharts config={config} />
          </Col>
        </Row>
        <Divider style={{margin: '20px 0px'}} />
        <Row className="rowclass dashboardClass">
          <Col span={24}>
            <Card>
              <Card.Grid style={gridStyle}>
                <Link to="/admin/category/list">
                  <Card
                    title="Events"
                    extra={<ProfileOutlined />}
                    className={_linkClass}
                  >
                    {eventslength}
                  </Card>
                </Link>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Link to="/admin/students/list">
                  <Card
                    title="Students"
                    extra={<TeamOutlined />}
                    className="_linkClass"
                  >
                    {studentslength}
                  </Card>
                </Link>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Link to="/admin/events/eventforms">
                  <Card
                    title="Registered Forms"
                    extra={<FormOutlined />}
                    className="_linkClass"
                  >
                    {formslength}
                  </Card>
                </Link>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Link to="/admin/events/comments">
                  <Card
                    title="CommentOutlined"
                    extra={<CommentOutlined />}
                    className="_linkClass"
                  >
                    {commentslength}
                  </Card>
                </Link>
              </Card.Grid>
            </Card>
          </Col>
        </Row>
        <Divider style={{margin: '20px 0px 50px 0px'}} />
      </div>
    </>
  );
};

export default AdmDashboard;
