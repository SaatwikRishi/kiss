import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector, navigate } from 'react-redux';
import { Link } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm, message } from 'antd';
import {
  SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
  FileSearchOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import _ from 'lodash'
import axios from 'axios';
import moment from 'moment-timezone'
import { getAllEvents, getAllStudents } from '../../store/actions';
import loading from '../../../assets/images/loading.gif'
let lib = require('../../libs/index')
import SendNotification from './sendnotification';
moment.tz.setDefault('Asia/Kolkata')

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Column } = Table;
const { Search } = Input;

const ListEvents = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getAllStudents(1));
  }, []);

  const categoryData = useSelector(state => state.events);
  const studentsList = useSelector(state => state.students);
  let categorys = categoryData.eventList ? categoryData.eventList : {};
  categorys = categorys.data ? categorys.data : [];
  const categoryDatas = [];
  if (categorys != undefined) {
    for (let i = 0; i < categorys.length; i++) {
      categoryDatas.push({
        key: (i + 1),
        eventid: categorys[i].eventid,
        event_name: categorys[i].event_name,
        event_desc: categorys[i].event_desc,
        end_date: ((categorys[i].start_date)?moment(categorys[i].start_date).format('YYYY-MM-DD')+' - ':'')+''+moment(categorys[i].end_date).format('YYYY-MM-DD'),
        apply_date: ((categorys[i].apply_date)?moment(categorys[i].apply_date).format('YYYY-MM-DD'):''),
        document_url: categorys[i].document_url,
        tags: categorys[i].tags,
      });
    }
  }
  const [InitialDatas, setInitialDatas] = useState(categoryDatas);
  const [Searched, setSearched] = useState(0);

  const search = (value) => {
    let searchRec = categoryDatas.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
    setSearched(1);
    setInitialDatas(value ? searchRec : categoryDatas);
  }

  const tableDatas = (InitialDatas.length > 0) ? InitialDatas : categoryDatas;

  /* modal functions */  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
      setIsModalVisible(true);
  };

  const handleOk = () => {
      setShowRawdata(true);
      copyRef.current.style.display = 'inline';
  };

  const handleCancel = () => {
      setIsModalVisible(false);
  };
  /* modal functions */

  const deleteRec = (record) => {
    axios.post('/events/api/deleteEvent', {data:{...record}}).then(function (res) {
      message.success(`Record deleted successfully, Please refresh the page!`);
      dispatch(getAllEvents());
      navigate("/admin/events/list")
    })
    .catch(function (error) {
      navigate("/admin/events/list")
    });
  };

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'event_name',
      width: '30%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'event_name'),
      render: (text, record) => {
        return (<>
          <Link to={`/admin/events/new/${record.eventid}`}>{text}</Link>
        </>)
      }
    },
    {
      title: 'Event Date',
      dataIndex: 'end_date',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'end_date'),
    },
    {
      title: 'Last Date',
      dataIndex: 'apply_date',
      width: '10%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'apply_date'),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'tags'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_, record) => {
        return (
          <>
            <Typography.Link title="Edit">
              <Link to={`/admin/events/new/${record.eventid}`}><EditOutlined /></Link>
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRec(record)}>
              <a title="Delete" style={{ padding: "0px 10px" }}><DeleteOutlined /></a>
            </Popconfirm>
            <SendNotification data={{categorys, record, studentsList}} />
          </>
        );
      },
    },
  ];

  return <>
    <div className="_apifilter_subheader">
      <div className="_details">
        <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Events List </div>
        <div className="_subTitle">events list </div>
      </div>
      <div className="filters"></div>
    </div>
    <Divider style={{ margin: '20px 0' }} />
    {!categoryDatas.loading ?
      <div className="_admin_body">
        <Row className="rowclass">
          <Col span={17}>

          </Col>
          <Col span={6}>
            <Search size='middle' placeholder="Search" allowClear onSearch={(e) => search(e)} enterButton style={{ float: 'right', margin: '5px 25px' }} />
          </Col>
          <Col span={1}>
            <Link to={`/admin/events/new/`}><Button type="primary" style={{ float: 'right', margin: '5px' }}>Add New</Button></Link>
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

export default ListEvents;