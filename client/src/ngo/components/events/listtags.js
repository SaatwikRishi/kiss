import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector, navigate } from 'react-redux';
import { Link } from '@reach/router';
import { Breadcrumb, Table, Input, Space, Form, Select, Button, DatePicker, Modal, Typography, Row, Col, Divider, Alert, InputNumber, Popconfirm, message  } from 'antd';
import { SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
    FileSearchOutlined, EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash'
import axios from 'axios';
import moment from 'moment-timezone'
import { getTagsResult } from '../../store/actions';
import loading from '../../../assets/images/loading.gif'
let lib = require('../../libs/index')

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Column } = Table;
const { Search } = Input;

const ListCategory = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTagsResult());
  },[]);

  const tagData = useSelector(state => state.tags);
  const tags = tagData.list;

  const tagDatas = [];
  if (tags != undefined) {
    for (let i = 0; i < tags.length; i++) {
      tagDatas.push({
        key: (i + 1),
        tagid: tags[i].tagid,
        tag: tags[i].tag,
      });
    }
  }
  const [InitialDatas, setInitialDatas] = useState(tagDatas); 
  const [Searched, setSearched] = useState(0); 
  
  const search=(value)=>{
      let searchRec = tagDatas.filter(o =>
          Object.keys(o).some(k =>
              String(o[k])
                  .toLowerCase()
                  .includes(value.toLowerCase())
          )
      );
      setSearched(1);
      setInitialDatas(value ? searchRec : tagDatas);
  }

  const tableDatas = (InitialDatas.length>0)?InitialDatas:tagDatas;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input id="tag" placeholder="Tag Name"/>;
    return (<>
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
      </>
    );
  };
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState(tableDatas);
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      tag: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deleteRec = (record) => {
    axios.post('/events/api/deleteTag', {data:{...record}}).then(function (res) {
      message.success(`Record deleted successfully, Please refresh the page!`);
      dispatch(getTagsResult());
      navigate("/admin/events/listtags")
    })
    .catch(function (error) {
      navigate("/admin/events/listtags")
    });
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...tableDatas];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index]; 
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      } 
      const updateditem = newData[index];       
      axios.post('/events/api/saveTag', {data:{...updateditem}}).then(function (res) {
        message.success(`Record updated successfully, Please refresh the page!`);
        dispatch(getTagsResult());
        navigate("/admin/events/listtags")
      })
      .catch(function (error) {
        navigate("/admin/events/listtags")
      });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
 
  const columns = [
    {
      title: 'Tag',
      dataIndex: 'tag',
      editable: true,
      width: '80%',
      sorter: (a, b) => lib.NumberStringSort(a, b, 'tag'),
      render: (text, record) => {
        return (<>
          <Link to={`/admin/events/createtag/${record.tagid}`}>{text}</Link>
        </>)
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
              title="Save"
            >
              <SaveOutlined />
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a title="Cancel" style={{padding:"0px 10px"}}><CloseCircleOutlined /></a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <Typography.Link title="Edit" disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined />
          </Typography.Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteRec(record)}>
            <a title="Delete" style={{padding:"0px 10px"}}><DeleteOutlined /></a>
          </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'type' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Tag List </div>
                <div className="_subTitle">tags list </div>
            </div>
            <div className="filters"></div>
        </div>
        <Divider style={{ margin: '20px 0' }} />
        {tagDatas.length>0 ?
            <div className="_admin_body">
            <Row className="rowclass">
                <Col span={17}>
                
                </Col>
                <Col span={6}>
                <Search size='middle' placeholder="Search" allowClear onSearch={(e)=>search(e)} enterButton  style={{ float: 'right', margin: '5px 25px' }}/>
                </Col>
                <Col span={1}>
                <Link to={`/admin/events/createtag/`}><Button type="primary" style={{ float: 'right', margin: '5px' }}>Add New</Button></Link>              
                </Col>
                <Col span={24}>
                  <Form form={form} component={false}>
                  <Table 
                  bordered
                  dataSource={tableDatas}
                  columns={mergedColumns}  
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}    
                  rowClassName="editable-row"   
                  />
                  </Form>
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