import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm, message  } from 'antd';
import { SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
    FileSearchOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash'
import axios from 'axios';
import moment from 'moment-timezone'
import { getAllCategories } from '../../store/actions';
import loading from '../../../assets/images/loading.gif'
let lib = require('../../libs/index')

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Column } = Table;
const { Search } = Input;

const ListCategory = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  },[]);

  const deleteRec = (record) => {
    axios.post('/events/api/deleteCategory', {data:{...record}}).then(function (res) {
      message.success(`Record deleted successfully, Please refresh the page!`);
      dispatch(getAllCategories());
      navigate("/admin/category/list")
    })
    .catch(function (error) {
      navigate("/admin/category/list")
    });
  };

  const categoryData = useSelector(state => state.category);
  const categorys = categoryData.list;

  const categoryDatas = [];
  if (categorys != undefined) {
    for (let i = 0; i < categorys.length; i++) {
      categoryDatas.push({
        key: (i + 1),
        catid: categorys[i].catid,
        name: categorys[i].name,
        description: categorys[i].description,
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
      title: 'Name',
      dataIndex: 'name',
      width: '40%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'name'),
      render: (text, record) => {
        return (<>
          <Link to={`/admin/category/new/${record.catid}`}>{text}</Link>
        </>)
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'description'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_, record) => {
        return (
          <>
          <Typography.Link title="Edit">
            <Link to={`/admin/category/new/${record.catid}`}><EditOutlined /></Link>
          </Typography.Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteRec(record)}>
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
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Category List </div>
                <div className="_subTitle">category list </div>
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
                <Search size='large' placeholder="Search" allowClear onSearch={(e)=>search(e)} enterButton  style={{ float: 'right', margin: '5px 25px' }}/>
                </Col>
                <Col span={1}>
                <Link to={`/admin/category/new/`}><Button size='large' type="primary" style={{ float: 'right', margin: '5px' }}>Add New</Button></Link>
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

export default ListCategory;