import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm, Popover, message } from 'antd';
import {
  SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
  FileSearchOutlined, EditOutlined, CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import _ from 'lodash'
import axios from 'axios';
import moment from 'moment-timezone'
import { getAllEvents, getAllStudents, getAllComments } from '../../store/actions';
import loading from '../../../assets/images/loading.gif'
let lib = require('../../libs/index')
moment.tz.setDefault('Asia/Kolkata')

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Column } = Table;
const { Search } = Input;

const Eventcomments = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComments());
  }, []);  
  const eventsData = useSelector(state => state.events);
  const studentsData = useSelector(state => state.students);

  useEffect(() => {
    if (!eventsData.eventsList) {
        dispatch(getAllEvents());
    } else if (eventsData.eventsList.loading) {
        dispatch(getAllEvents());
    }
    if (!studentsData.students) {
      dispatch(getAllStudents());
  } else if (studentsData.students.loading) {
      dispatch(getAllStudents());
  }
  }, [])

  /**
   * getForm data  from Store
   */
  const getEventStoreData = () => {
      let mainEventsObj = eventsData ? eventsData : {}
      mainEventsObj = mainEventsObj ? mainEventsObj : [];
      
      let mainStdObj = studentsData ? studentsData: {}
      mainStdObj = mainStdObj ? mainStdObj : [];

      return {
          eventList:{
              loading: true,
              eventList:[],
              ...mainEventsObj
          },
          studentsList:{
              loading: true,
              list: [],
              ...mainStdObj
          }
      }
  }
  let eventsAllData = getEventStoreData();

  const commentsData = useSelector(state => state.comments);
  let comments = commentsData.list ? commentsData.list : [];
  const commentDatas = [];
  if (comments != undefined) {
    for (let i = 0; i < comments.length; i++) {
      let eventEditObj = _(eventsAllData.eventList.eventList.data).filter(val => val.eventid == comments[i].event_id).value();
      eventEditObj = eventEditObj.length ? eventEditObj[0] : {};
      
      let stdEditObj = _(eventsAllData.studentsList.list).filter(val => val.studentid == comments[i].student_id).value();
      stdEditObj = stdEditObj.length ? stdEditObj[0] : {};

      commentDatas.push({
        key: (i + 1),
        id: comments[i].id,
        event_id: eventEditObj.event_name,
        student_id: stdEditObj.firstname+' '+stdEditObj.lastname,
        com_date: ((comments[i].com_date)?moment(comments[i].com_date).format('YYYY-MM-DD'):''),
        com_text: comments[i].com_text,
        status: ((comments[i].status=='1')?"Activated":"De Activated")
      });
    }
  }
  const [InitialDatas, setInitialDatas] = useState(commentDatas);
  const [RowPopover, setRowPopover] = useState(null);
  const [SelStatus, setSelStatus] = useState('');
  const [Searched, setSearched] = useState(0);

  const saveStatus = (record) => {
    let formData = { id: record.id, status: SelStatus }
    axios.post(`/events/api/changeCommentStatus`, { data: formData }).then(res => {
        setRowPopover(null)
        message.success(`Status updated successfully, Please refresh the page!`);
        dispatch(getAllComments());
        window.location.href = "/admin/events/listcomments";
    })
  };

  const deleteRec = (record) => {
    axios.post('/events/api/deleteComment', {data:{...record}}).then(function (res) {
      message.success(`Record deleted successfully, Please refresh the page!`);
      dispatch(getAllComments());
      navigate("/admin/events/listcomments")
    })
    .catch(function (error) {
      navigate("/admin/events/listcomments")
    });
  };

  const search = (value) => {
    let searchRec = commentDatas.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
    setSearched(1);
    setInitialDatas(value ? searchRec : commentDatas);
  }

  const tableDatas = (InitialDatas.length > 0) ? InitialDatas : commentDatas;

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'event_id',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'event_id'),
    },
    {
      title: 'Student Name',
      dataIndex: 'student_id',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'student_id'),
    },
    {
      title: 'Date',
      dataIndex: 'com_date',
      width: '10%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'com_date'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'status'),
    },
    {
      title: 'Comments',
      dataIndex: 'com_text',
      width: '30%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'com_text'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, record, index) => {
        const content = (
          <div className="_table_action_button_menu" onClick={() => setRowPopover(null)}>
              <Select id={['comment_'+record.id]} placeholder="-Status-" defaultValue={record.status} 
                onChange={(value) => {
                  setSelStatus(value)
                }} 
              >
                <Option value="1">Activate</Option>
                <Option value="0">De Activate</Option>
              </Select>
              <Button type="primary" style={{ float: 'right', marginLeft: '5px' }} onClick={() => saveStatus(record)}>Save</Button>
          </div>
        );
        return (
          <>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteRec(record)}>
            <a title="Delete" style={{padding:"0px 5px"}}><DeleteOutlined /></a>
          </Popconfirm>
          <Popover onClick={() => setRowPopover(index)} placement="left" content={content} trigger="click">
            <a title={record.status} style={{padding:"0px 5px"}}>{(record.status=='Activated')?<CheckCircleOutlined />:<CloseCircleOutlined />}</a>
          </Popover>
          </>
        );
      },
    },
  ];

  return <>
    <div className="_apifilter_subheader">
      <div className="_details">
        <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Comments </div>
        <div className="_subTitle">Comments </div>
      </div>
      <div className="filters"></div>
    </div>
    <Divider style={{ margin: '20px 0' }} />
    {!commentDatas.loading ?
      <div className="_admin_body">
        <Row className="rowclass">
          <Col span={17}>

          </Col>
          <Col span={6}>
            <Search size='middle' placeholder="Search" allowClear onSearch={(e) => search(e)} enterButton style={{ float: 'right', margin: '5px 25px' }} />
          </Col>
          <Col span={24}>
            <Table
              bordered
              dataSource={tableDatas}
              columns={columns}
            />
          </Col>
        </Row>
      </div> :
      <div className="_center_loader" style={{ display: 'grid', height: '100vh', width: '100vw', justifyContent: 'space-evenly', alignItems: 'center', }}>
        <img src={loading} style={{ width: 800, height: 600, border: 'solid 2px #ccc', borderRadius: 10 }} />
      </div>
    }
  </>
};

export default Eventcomments;