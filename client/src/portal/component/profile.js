
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
import { getAllStudents } from '../../ngo/store/actions';
import axios from 'axios';

const ProfilePage = (props) => {
    const [form] = Form.useForm();


    const student = useSelector(state => state.user);
    let initialState = student
    const [loading, setloading] = useState(false);
    const [Inistate, setIniState] = useState(initialState)

    //useEffect(() => form.resetFields(), [Inistate])

    const onFinish = async (e) => {
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
            <section style={{ marginTop: 50, padding: '10px 20px' }}>
                <div className="category_creation" style={{ minHeight: '80vh' }}>
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
                                <Form.Item name={'studentid'} hidden={true}>
                                    <Input type="text" />
                                </Form.Item>
                                <Form.Item name={'stdcatid'} hidden={true}>
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
                        <section>
                            <CategoryForm student={student} />
                        </section>
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
const CategoryForm = (props) => {
    const { student_json, fUpdateTrigger, fields } = props;

    const dateFormat = 'YYYY-MM-DD';
    return <>
        <Divider style={{ margin: '20px 0' }} />
        <div className="category_box_basic" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridGap: 25 }}>
            {_.keys(fields, (val) => {
                let template = '';
                if (val.input_type == 'text') {
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json', 0, val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Input size="middle" style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'dropdown') {
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json', 0, val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Select size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                {val.dropdown.map(val => <Option value={val}>{val}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'tags') {
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json', 0, val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Select mode="tags" size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                {val.dropdown.map(val => <Option value={val}>{val}</Option>)}
                            </Select>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'datepicker') {
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json', 0, val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <DatePicker size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isAfter(moment.now())} />
                        </Form.Item>
                    </div>
                }
                // if (val.input_type == 'upload'){
                //     template = <div className="category_item">
                //         <Form.Item hasFeedback={true} name={['student_json',val.name,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>

                //         </Form.Item>
                //     </div>
                // }
                return template;
            }
            )}

        </div>
    </>
}

/* 




*/

export default ProfilePage;