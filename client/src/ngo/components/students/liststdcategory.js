import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector, navigate } from 'react-redux';
import { Link } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm  } from 'antd';
import { SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
    FileSearchOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash'
import axios from 'axios';
import moment from 'moment-timezone'
import { getAllStdCategories } from '../../store/actions';
import loading from '../../../assets/images/loading.gif'
let lib = require('../../libs/index')

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Column } = Table;
const { Search } = Input;

const ListCategory = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStdCategories());
  },[]);

  const categoryData = useSelector(state => state.stdcategory);
  const categorys = categoryData.list;

  const categoryDatas = [];
  if (categorys != undefined) {
    for (let i = 0; i < categorys.length; i++) {
      categoryDatas.push({
        key: (i + 1),
        stdcatid: categorys[i].stdcatid,
        studentcat_json: categorys[i].studentcat_json,
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
      title: 'Form Fields',
      dataIndex: 'studentcat_json',
      width: '80%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'studentcat_json'),
      render: (text, record) => {
        return (<>
          {JSON.parse(text).map(function(item){ 
              return item.name+', '
          })}
        </>)
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_, record) => {
        return (
          <>
          <Typography.Link title="Edit">
          <Link to={`/admin/students/createstdcategory/${record.stdcatid}`}><EditOutlined /></Link>
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
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Student Category List </div>
                <div className="_subTitle">student category list </div>
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
            {categoryDatas.length==0 ?                  
                <Link to={`/admin/students/createstdcategory/`}><Button type="primary" style={{ float: 'right', margin: '5px' }}>Add New</Button></Link> : ''
            }           
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

export default ListCategory;