
import React, { useEffect, memo, useState, useRef }  from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import { Row, Col, Table, Button, Form, Input, Layout, Modal, Space, Divider,Dropdown, Select, Typography, notification, Slider } from 'antd';
import { DownloadOutlined, CalendarFilled, SendOutlined, ApartmentOutlined } from '@ant-design/icons'
import { Link, navigate } from '@reach/router';
import moment from 'moment-timezone'
import _ from 'lodash'
import axios from 'axios';

let lib = require('../../libs/index')
import { getAllStudents, getAllStudentForms } from '../../store/actions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option, OptGroup } = Select;
const { Column } = Table
const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const Notification = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { categorys, record, studentsList, formsData } = props.data;
    const [NotificationData, setNotificationData] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setloading] = useState(false);
    const districtData = lib.districts();

    
    const [showStudent, setshowStudent] = useState('none');    
    const [showAgerange, setshowAgerange] = useState('none');    
    const [showDistrict, setshowDistrict] = useState('none');

    let forms = formsData.list ? formsData.list : [];
    let allstudents = studentsList.list;
    allstudents = Object.keys(_.groupBy(allstudents, 'email'));
    
    let formStore = { title: record.event_name, message: record.event_desc };
    const [StudentsEmails, setStudentsEmails] = useState(allstudents);

    let stdObj = _(forms).filter(val => val.eventid == record.eventid ).value();
    let regstudents = [];
    if(stdObj.length>0)
    {
        let groupedstd = Object.keys(_.groupBy(stdObj, 'studentid'));
        let studentemailfilter = _(studentsList.list).filter(val => groupedstd.indexOf((val.studentid).toString())>-1 ).value();
        regstudents = Object.keys(_.groupBy(studentemailfilter, 'email'));
    }

    const setStudents = (value) => {
        if(value!='Age' && value!='District') {
            setStudentsEmails(((value=="Registered Students")?regstudents:allstudents))
            setshowStudent('block')
            setshowAgerange('none')
            setshowDistrict('none')
        } else if(value=='Age') {
            setStudentsEmails(allstudents)
            setshowStudent('none')
            setshowAgerange('block')
            setshowDistrict('none')
        } else if(value=='District') {
            setStudentsEmails(allstudents)
            setshowStudent('none')
            setshowAgerange('none')
            setshowDistrict('block')
        }
    };

    const clickRowData = () => {
        showModal();
    };
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = (e, categorys, record, studentsList ) => {
        console.log(studentsList.list);
        let formData = {
            title: e.title,
            message: EditorVal,
            eventid: record.eventid
        };
        setloading(true);
        let mailstudents = [];
        if(e.type!='Age' && e.type!='District') {
            mailstudents = _(studentsList.list).filter(val => StudentsEmails.indexOf((val.email).toString())>-1 ).value();
        } else if(e.type=='Age' && e.agerange) {
            mailstudents = _(studentsList.list).filter(val => val.dob && ( lib.calculate_age(moment(val.dob).format('YYYY-MM-DD')) >= e.agerange[0] && lib.calculate_age(moment(val.dob).format('YYYY-MM-DD')) <= e.agerange[1] ) ).value();
        } else if(e.type=='District' && e.district) {
            mailstudents = _(studentsList.list).filter(val => val.district && e.district.indexOf((val.district).toString())>-1 ).value();
        }
        let getEvent = {};
        var eventTags = [];
        var stdEmails = [];
        if(record.eventid)
        {    
            if(e.emails) { 
                stdEmails = e.emails;
            } else {                
                getEvent = categorys.filter(function(item) {
                    return (item.eventid==record.eventid);
                });
                if(getEvent[0].tags!='' && getEvent[0].tags!=undefined)
                {               
                    eventTags = getEvent[0].tags.split(',');
                }
                if(eventTags.length>0)
                {
                    mailstudents.forEach(val => { 
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
        } 
        axios.post(`/events/api/sendNotification`, { data: formData, stdEmails: stdEmails }).then(res => {
            handleCancel()
            navigate("/admin/events/list")
            notification.success({
                message: 'Success',
                description: `Notification sent successfully!`
            });
        }).finally(() => {
            setloading(false)
            handleCancel()
        })
        console.log(stdEmails);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const [EditorValid, setEditorValid] = useState(true);
    const [EditorVal, setEditorVal] = useState(record.event_desc);
    
    return <>
            <Typography.Link title="Send Notification" style={{ padding: "0px 5px" }}><SendOutlined onClick={()=>clickRowData()} /></Typography.Link>
            <Modal
                title="Send Notification"
                visible={isModalVisible} 
                footer={null} 
                width={800}
                onCancel={handleCancel}
            >
                <div className="category_creation" style={{ minHeight: '70vh'}}>
                    <Form className="initial_form" layout="vertical"
                        form={form}
                        onFinish={(e) => onFinish(e, categorys, record, studentsList )}
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
                                    <TextEditor setEditorValid={setEditorValid} setEditorVal={setEditorVal} EditorVal={EditorVal} />
                                </Form.Item>
                            </div>
                            <div className="category_item" style={{ margin: '60px 0 20px 0' }}>
                                <Form.Item hasFeedback={true} name={'type'} label="Notification Type" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Select name={'type'} placeholder="-Notification Type-" 
                                        onChange={(value) => {
                                            setStudents(value)
                                        }} 
                                    >
                                        <Option value="All Students">All Students</Option>
                                        {(stdObj.length>0)?<Option value="Registered Students">Registered Students</Option>:''} 
                                        <Option value="Age">Age</Option> 
                                        <Option value="District">District</Option>                                       
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="category_item" style={{ display: showStudent }}>
                                <Form.Item hasFeedback={true} name={'emails'} label="Students" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <Select mode="multiple" size="middle" onChange={(e) => {  }} >
                                        {StudentsEmails && StudentsEmails.map(val => <Option value={val}>{val}</Option>)}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="category_item" style={{ display: showAgerange }}>
                                <Form.Item hasFeedback={true} name={'agerange'} label="Age Range" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <Slider range defaultValue={[18, 60]} />
                                </Form.Item>
                            </div>
                            <div className="category_item" style={{ display: showDistrict }}>
                                <Form.Item hasFeedback={true} name={'district'} label="District" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <Select mode="multiple" size="middle" onChange={(e) => {  }} >
                                        {districtData.districts.map(val=> <Option value={val}>{val}</Option> )}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <Divider style={{ margin: '20px 0' }} />
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
    const { EditorVal } = props;
    console.log(EditorVal);
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
          value={EditorVal || ''}
          modules={modules}
          formats={formats}
          onChange={OnChange}
          style={{height: '150px'}}
        />
      </>
  };