
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Alert, Card, Layout, Spin, Row, Col, Tabs, Checkbox, Input, Button, Form, Select, message, Modal, Result } from 'antd';
const { Content } = Layout;
import { GoogleOutlined } from '@ant-design/icons';
import { updateUser } from '../../ngo/store/actions';
import axios from 'axios';



const ChangePassword = (props) => {
    const [form] = Form.useForm();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    const [state, setState] = useState({ hasError: false, message: null })
    const student = useSelector(state => state.user);

    const onFinish = (values) => {
        setState({ ...state, hasError: false, message: null })
        console.log(values);
        axios.post('/api/login', values).then((resp) => {
            console.log(resp);
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return <>
            <section style={{ marginTop: 50 }}>
                <div className="loginbox center_box_medium ">
                    <Card bordered title="Change Password">
                        <Form name="basic" layout="vertical" initialValues={{ email: student.email }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                            <Form.Item label="Old Password" name="password" rules={[{ required: true, message: 'Please input your old password!' }]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item label="New Password" name="new_password" rules={[{ required: true, message: 'Please input your new password!' }]} >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item label="Confirm Password" name="confirm_password" 
                                dependencies={['new_password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('new_password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            {state.hasError &&
                                <Form.Item>
                                    <Alert message="Login Failure" description={state.message} type="error" closable />
                                </Form.Item>
                            }
                            <Form.Item >
                                <Button type="primary" size="large" htmlType="submit" style={{ marginRight: 10 }}>Change Password</Button>
                            </Form.Item>
                        </Form>                            
                    </Card>
                </div>
            </section>
            <br/><br/>
    </>
}

export default ChangePassword;