import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm, Popover, message  } from 'antd';
import { SafetyCertificateTwoTone, DeleteOutlined, CloseCircleOutlined,
  CheckCircleOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import _ from 'lodash'
import axios from 'axios';
import moment from 'moment-timezone'
import { getAllStudents } from '../../store/actions';
import loading from '../../../assets/images/loading.gif'
let lib = require('../../libs/index')

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Column } = Table;
const { Search } = Input;

const ListStudents = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudents());
  },[]);

  const categoryData = useSelector(state => state.students);
  const categorys = categoryData.list;

  const categoryDatas = [];
  if (categorys != undefined) {
    for (let i = 0; i < categorys.length; i++) {
      categoryDatas.push({
        key: (i + 1),
        studentid: categorys[i].studentid,
        firstname: categorys[i].firstname,
        lastname: categorys[i].lastname,
        email: categorys[i].email,
        regno: categorys[i].regno,
        status: categorys[i].status,
        stdstatus: (categorys[i].status=='1')?'Active':'In Active',
      });
    }
  }
  const [InitialDatas, setInitialDatas] = useState(categoryDatas); 
  const [RowPopover, setRowPopover] = useState(null);
  const [SelStatus, setSelStatus] = useState('');
  const [Searched, setSearched] = useState(0); 

  const saveStatus = (record) => {
    let formData = { studentid: record.studentid, status: SelStatus, firstname: record.lastname, lastname: record.lastname, email: record.email }
    axios.post(`/events/api/changeStudentStatus`, { data: formData }).then(res => {
        setRowPopover(null)
        message.success(`Status updated successfully, Please refresh the page!`);
        dispatch(getAllStudents());
        window.location.href = "/admin/students/list";
    }).finally(() => {
        setloading(false);
    })
  };

  const deleteRec = (record) => {
    axios.post('/events/api/deleteStudent', {data:{...record}}).then(function (res) {
      message.success(`Record deleted successfully, Please refresh the page!`);
      dispatch(getAllStudents());
      navigate("/admin/students/list")
    })
    .catch(function (error) {
      navigate("/admin/students/list")
    });
  };
  
  const search=(value)=>{
    console.log(value);
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

  const tableDatas = (InitialDatas.length>0)?InitialDatas:categoryDatas;
 
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'firstname'),
      render: (text, record) => {
        return (<>
          <Link to={`/admin/students/create/${record.studentid}`}>{text}</Link>
        </>)
      }
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'lastname'),
    },    
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'email'),
    },    
    {
      title: 'Registration Number',
      dataIndex: 'regno',
      width: '20%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'regno'),
    }, 
    {
      title: 'Status',
      dataIndex: 'stdstatus',
      width: '10%',
      editable: true,
      sorter: (a, b) => lib.NumberStringSort(a, b, 'stdstatus'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, record, index) => {
        const content = (
          <div className="_table_action_button_menu" onClick={() => setRowPopover(null)}>
              <Select id={['stdstatus_'+record.studentid]} placeholder="-Status-" defaultValue={record.status} 
                onChange={(value) => {
                  setSelStatus(value)
                }} 
              >
                <Option value="1">Active</Option>
                <Option value="0">In Active</Option>
              </Select>
              <Button type="primary" style={{ float: 'right', marginLeft: '5px' }} onClick={() => saveStatus(record)}>Save</Button>
          </div>
        );
        return (
          <>
          <Typography.Link title="Edit">
          <Link to={`/admin/students/create/${record.studentid}`}><EditOutlined /></Link>
          </Typography.Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteRec(record)}>
            <a title="Delete" style={{padding:"0px 5px"}}><DeleteOutlined /></a>
          </Popconfirm>
          <Popover onClick={() => setRowPopover(index)} placement="left" content={content} trigger="click">
            <a title={(record.status=='1')?'Active':'In Active'} style={{padding:"0px 5px"}}>{(record.status=='1')?<CheckCircleOutlined />:<CloseCircleOutlined />}</a>
          </Popover>
          </>
        );
      },
    },
  ];

  return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Students List </div>
                <div className="_subTitle">students list </div>
            </div>
            <div className="filters"></div>
        </div>
        <Divider style={{ margin: '20px 0' }} />
        <div className="_admin_body">
        <Row className="rowclass">
            <Col span={17}>
            
            </Col>
            <Col span={6}>
            <Search size='middle' placeholder="Search" allowClear onSearch={(e)=>search(e)} enterButton  style={{ float: 'right', margin: '5px 25px' }}/>
            </Col>
            <Col span={1}>
            <Link to={`/admin/students/create/`}><Button type="primary" style={{ float: 'right', margin: '5px' }}>Add New</Button></Link>              
            </Col>
            <Col span={24}>
            <Table 
            bordered
            dataSource={tableDatas}
            columns={columns}     
            />
            </Col>
        </Row>
        </div>
  </>
};

export default ListStudents;