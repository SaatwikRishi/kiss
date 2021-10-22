
import React, { useEffect, memo, useState, useRef }  from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import { Row, Col, Table, Button, Form, Input, Layout, Modal, Space, Divider,Dropdown, Menu, Typography, notification} from 'antd';
import { DownloadOutlined, CalendarFilled, SendOutlined, ApartmentOutlined } from '@ant-design/icons'
import { Link, navigate } from '@reach/router';
import moment from 'moment-timezone'
import _ from 'lodash'
import axios from 'axios';

let lib = require('../../libs/index')
import { getAllStudents } from '../../store/actions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Column } = Table
const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const Notification = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [EditorValid, setEditorValid] = useState(true);
    const [EditorVal, setEditorVal] = useState('');
    const { categorys, record, studentsList } = props.data;
    const [NotificationData, setNotificationData] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [NotificationClass, setNotificationClass] = useState('clickBtn');
    const [loading, setloading] = useState(false);

    const clickRowData = () => {
        showModal();
    };
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = (e, categorys, record, studentsList) => {
        console.log(e);
        let formData = {
            title: e.title,
            message: EditorVal
        };
        setloading(true);
        let students = studentsList.list;
        let getEvent = {};
        var eventTags = [];
        var stdEmails = [];
        if(record.eventid)
        {    
            getEvent = categorys.filter(function(item) {
                return (item.eventid==record.eventid);
            });
            if(getEvent[0].tags!='' && getEvent[0].tags!=undefined)
            {               
                eventTags = getEvent[0].tags.split(',');
            }
            if(eventTags.length>0)
            {
                students.forEach(val => { 
                    if(val.tags){
                        var stdTags = val.tags.split(',');
                        var filteredArray = _.intersection( stdTags , eventTags );
                        if(filteredArray.length>0){
                            stdEmails.push(val.email);
                        }
                    } 
                });  
            }
        } 
        axios.post(`/events/api/sendNotification`, { data: formData, stdEmails: stdEmails }).then(res => {
            setIsModalVisible(false);
            navigate("/admin/events/list")
            notification.success({
                message: 'Success',
                description: `Notification sent successfully!`
            });
        }).finally(() => {
            setIsModalVisible(false);
        })
        console.log(stdEmails);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    let formStore = { title: record.event_name, message: record.event_desc };
    
    return <>
            <Typography.Link title="Send Notification"><SendOutlined onClick={()=>clickRowData()} /></Typography.Link>
            <Modal
                title="Send Notification"
                visible={isModalVisible} 
                footer={null} 
                width={800}
            >
                <div className="category_creation" style={{ minHeight: '60vh'}}>
                    <Form className="initial_form" layout="vertical"
                        form={form}
                        onFinish={(e) => onFinish(e, categorys, record, studentsList)}
                        initialValues={{
                            ...(() => {
                                return {...formStore}
                            })(),
                        }}
                    >
                        <div className="category_list">
                            <div className="category_item">
                                <Form.Item  hasFeedback={true} name= {'title'} label="title" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Input size="middle" />
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'message'} label="message" rules={[{ required: EditorValid, message: 'Please fill!' }]}>
                                    <TextEditor setEditorValid={setEditorValid} setEditorVal={setEditorVal} />
                                </Form.Item>
                            </div>
                        </div>
                        <Divider style={{ margin: '60px 0 20px 0' }} />
                        <Space style={{float: 'right'}}>
                            <Button onClick={()=>handleCancel()}> Cancel </Button>
                            <Button loading={loading} disabled={loading} icon={<SendOutlined />} type="primary" htmlType="submit"> Send Notification </Button>                            
                        </Space>
                    </Form>
                </div>
            </Modal>
    </>
};

export default Notification;

const TextEditor = (props) =>{
    console.log(props);
    const OnChange = (value) => {
      let editorval = ((value.trim()=='' || value=='<p><br></p>')?true:false)
      props.setEditorValid(editorval)
      props.setEditorVal(value)
    }
  
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'code'],
        ['clean'],
      ],
    };
    
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'code',
    ];
    
    return <>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={OnChange}
          style={{height: '150px'}}
        />
      </>
  };