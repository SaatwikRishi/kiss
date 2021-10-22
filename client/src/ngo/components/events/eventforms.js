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
import { getAllEvents, getAllStudents, getAllStudentForms } from '../../store/actions';
import loading from '../../../assets/images/loading.gif'
let lib = require('../../libs/index')
moment.tz.setDefault('Asia/Kolkata')

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Column } = Table;
const { Search } = Input;

const Eventforms = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudentForms());
    dispatch(getAllEvents());
    dispatch(getAllStudents(1));
  }, []);

  const formsData = useSelector(state => state.forms);
  const eventsData = useSelector(state => state.events);
  const studentsData = useSelector(state => state.students);
  let forms = formsData.list ? formsData.list : [];
  const formDatas = [];
  if (forms != undefined) {
    for (let i = 0; i < forms.length; i++) {
      formDatas.push({
        key: (i + 1),
        eventid: forms[i].eventid,
        studentid: forms[i].studentid,
        created_date: ((forms[i].created_date)?moment(forms[i].created_date).format('YYYY-MM-DD'):''),
        form_json: forms[i].form_json,
      });
    }
  }
  const [InitialDatas, setInitialDatas] = useState(formDatas);
  const [Searched, setSearched] = useState(0);

  const search = (value) => {
    let searchRec = formDatas.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
    setSearched(1);
    setInitialDatas(value ? searchRec : formDatas);
  }

  const tableDatas = (InitialDatas.length > 0) ? InitialDatas : formDatas;

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'eventid',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'eventid'),
      render: (text, record) => {
        return (<>
          {text}
        </>)
      }
    },
    {
      title: 'Student Name',
      dataIndex: 'studentid',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'studentid'),
    },
    {
      title: 'Date',
      dataIndex: 'created_date',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'created_date'),
      render: (text, record) => {
        return (<>
          {text}
        </>)
      }
    },
    {
      title: 'Description',
      dataIndex: 'form_json',
      width: '40%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'form_json'),
    }
  ];

  return <>
    <div className="_apifilter_subheader">
      <div className="_details">
        <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Events Forms </div>
        <div className="_subTitle">events forms </div>
      </div>
      <div className="filters"></div>
    </div>
    <Divider style={{ margin: '20px 0' }} />
    {!formDatas.loading ?
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

export default Eventforms;