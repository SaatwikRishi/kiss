
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { Breadcrumb, Card, Layout, Spin, Row, Col, Divider, Button, Input, Tabs, Select, Popover, Form, DatePicker, Space, notification, TimePicker, Modal } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
import {  getAllStudents } from '../../ngo/store/actions';
import axios from 'axios';

const ProfilePage = (props) => {    
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    if(!auth.currentUser) {
        //navigate('/login')
        navigate('/profile')
    }
    useEffect(() => {
      dispatch(getAllStudents());
    },[]);

    const studentData = useSelector(state => state.students);
    const students = studentData.list;
    let stdId = 1;

    let formStore = {};    
    let initialState = {}
    const [loading, setloading] = useState(false);
    const [Inistate, setIniState] = useState(initialState)

    let getStudent = {};
    useEffect(
        ()=>{
            if(stdId!='' &&  students!=undefined)
            {    
                getStudent = students.filter(function(item) {
                return (item.studentid==stdId);
            });
            if(getStudent!=undefined)
            {
                setIniState({studentid: stdId, stdcatid: getStudent[0].stdcatid, firstname: getStudent[0].firstname, lastname: getStudent[0].lastname, email: getStudent[0].email, regno: getStudent[0].regno, phoneno: getStudent[0].phoneno });
            }
            }
        },[stdId, students]
    )
    useEffect(() => form.resetFields(), [Inistate])

    const onFinish = async (e) =>{
        console.log(e);
        let formData = _(e).pickBy(val => val).value();
        setloading(true);
        await axios.post(`/events/api/saveStudentProfile`, { data: formData }).then(res => {
            navigate("/login")
        }).finally(() => {
            setloading(false);
        })
    }
    
    return <>
        <Content>
            <section style={{ marginTop: 50, fontSize: 30 }}>
                <div className="category_creation" style={{ minHeight: '80vh'}}>
                <Form className="initial_form" layout="vertical"
                    form={form}
                    onFinish={(e) => onFinish(e)}
                    initialValues={{
                        ...(() => {
                            return {
                                ...Inistate,
                            }
                        })(),
                    }}>
                    <div className="category_box_basic">
                        <div className="category_item">
                            <Form.Item name={'studentid'}  hidden={true}>
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item name={'stdcatid'}  hidden={true}>
                                <Input type="text" />
                            </Form.Item>

                            <Form.Item hasFeedback={true} name={'firstname'} label="first name" rules={[{ required: true, message: 'Please fill!' }]}>
                                <Input size="middle" />
                            </Form.Item>
                        </div>

                        <div className="category_item">
                            <Form.Item hasFeedback={true} name={'lastname'} label="last name" rules={[{ required: true, message: 'Please fill!' }]}>
                                <Input size="middle" />
                            </Form.Item>
                        </div>

                        <div className="category_item">
                            <Form.Item hasFeedback={true} name={'email'} label="email address" rules={[{ required: true, message: 'Please fill!' }]}>
                                <Input size="middle" />
                            </Form.Item>
                        </div>

                        <div className="category_item">
                            <Form.Item hasFeedback={true} name={'regno'} label="registration number" rules={[{ required: true, message: 'Please fill!' }]}>
                                <Input size="middle" />
                            </Form.Item>
                        </div>

                        <div className="category_item">
                            <Form.Item hasFeedback={true} name={'phoneno'} label="phone number" rules={[{ required: false, message: 'Please fill!' }]}>
                                <Input size="middle" />
                            </Form.Item>
                        </div>
                    </div>

                    <Divider style={{ margin: '20px 0' }} />
                    <Space>
                        <Button loading={loading} disabled={loading} icon={<FileSearchOutlined />} size="large" type="primary" htmlType="submit"> Update Profile </Button>
                    </Space>
                    </Form>
                </div>
            </section>
        </Content>

    </>
}

export default ProfilePage;