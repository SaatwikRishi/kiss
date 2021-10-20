import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector, navigate } from 'react-redux';
import { Link } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm  } from 'antd';
import { SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
    FileSearchOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
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
      });
    }
  }
  const [InitialDatas, setInitialDatas] = useState(categoryDatas); 
  const [Searched, setSearched] = useState(0); 
  
  const search=(value)=>{
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
      width: '40%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'firstname'),
      render: (text, record) => {
        return (<>
          <Link to={`/students/create/${record.studentid}`}>{text}</Link>
        </>)
      }
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      width: '40%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'lastname'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_, record) => {
        return (
          <>
          <Typography.Link title="Edit">
            <EditOutlined />
          </Typography.Link>
          <Popconfirm title="Sure to delete?">
            <a title="Delete" style={{padding:"0px 10px"}}><DeleteOutlined /></a>
          </Popconfirm>
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
        {categoryDatas.length>0 ?
            <div className="_admin_body">
            <Row className="rowclass">
                <Col span={17}>
                
                </Col>
                <Col span={6}>
                <Search size='middle' placeholder="Search" allowClear onSearch={(e)=>search(e)} enterButton  style={{ float: 'right', margin: '5px 25px' }}/>
                </Col>
                <Col span={1}>
                <Link to={`/students/create/`}><Button type="primary" style={{ float: 'right', margin: '5px' }}>Add New</Button></Link>              
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

export default ListStudents;