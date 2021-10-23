
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Alert, Card, Layout, Spin, Row, Col, Tabs, Checkbox, Input, Button, Form, Select, message } from 'antd';
const { Content } = Layout;
import { GoogleOutlined } from '@ant-design/icons';
import { updateUser,getAllTags } from '../../ngo/store/actions';
import axios from 'axios';



const LoginPage = (props) => {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    const [state, setState] = useState({ hasError: false, message: null })
    const tagsStore = useSelector(state => state.tags);

    useEffect(() => {
        if (!tagsStore){
            dispatch(getAllTags());
        } else if (!tagsStore.loading){
            dispatch(getAllTags());
        }
    },[])

    const onFinish = (values) => {
        setState({ ...state, hasError: false, message: null })
        axios.post('/api/login', values).then((resp) => {
            if (resp.data.result && resp.data.result.status === 'active') {
                let user = resp.data.result
                dispatch(updateUser(user))
                if (!resp.data.result.isProfileUpdate) {
                    navigate("/profile")
                } else {
                    navigate("/")
                }
            }
            else {
                setState({ ...state, hasError: true, message: resp.data.result.status })
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const onSignupFinish = (values) => {
        setState({ ...state, hasError: false, message: null })
        let formData = _(values).pickBy(val => val).value();
        axios.post(`/events/api/saveStudentProfile`, { data: { 
            ...formData,             
            type: 'user', 
        }}).then(res => {
            console.log(res);
            message.success("Your registration is successful!");
            navigate("/profile")
        })
    };
    const onSignupFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const signInWithGoogle = async () => {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error({ credential })
        });
    };
    const { TabPane } = Tabs;

    const getTagsStoreData = () => {
        //console.log(eventsStore);
        let mainObj = tagsStore ? tagsStore: {}
        mainObj = mainObj ? mainObj : [];
        //console.log(mainObj);
        return {
            loading: true,
            list: [],
            ...mainObj
        }
    }
    let tagsData = getTagsStoreData();

    const tagslist = tagsData.list;
    console.log(tagslist);
    const children = [];
    for (let i = 0; i < tagslist.length; i++) {
        children.push(<Option key={tagslist[i].tag}>{tagslist[i].tag}</Option>);
    }
    return <>
        <Content>
            <section style={{ marginTop: 50 }}>
                <Row align="middle" justify="center">
                    <Col span={10} >
                        <div className="loginbox">
                            <Card bordered title="Login / Sign Up">
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="Login" key="1">
                                        <Form name="basic" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                                            <Form.Item label="E-Mail" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                                                <Input.Password />
                                            </Form.Item>
                                            {state.hasError &&
                                                <Form.Item>
                                                    <Alert message="Login Failure" description={state.message} type="error" closable />
                                                </Form.Item>
                                            }
                                            <Form.Item name="remember" valuePropName="checked" >
                                                <Checkbox>Remember me</Checkbox>
                                            </Form.Item>
                                            <Form.Item >
                                                <Button type="primary" size="large" htmlType="submit" style={{ marginRight: 10 }}>Login</Button>
                                                <Button type="primary" size="large" icon={<GoogleOutlined />} onClick={() => signInWithGoogle()}>Login / Signup with Google</Button>
                                            </Form.Item>

                                        </Form>
                                    </TabPane>
                                    <TabPane tab="SignUp" key="2">
                                        <Form name="basic" layout="vertical" initialValues={{ remember: true }} onFinish={onSignupFinish} onFinishFailed={onSignupFinishFailed} autoComplete="off">
                                            <div className="category_box_basic">
                                                <div className="category_item">
                                                    <Form.Item hasFeedback={true} name={'firstname'} label="First name" rules={[{ required: true, message: 'Please fill!' }]}>
                                                        <Input size="middle" />
                                                    </Form.Item>
                                                </div>

                                                <div className="category_item">
                                                    <Form.Item hasFeedback={true} name={'lastname'} label="Last name" rules={[{ required: true, message: 'Please fill!' }]}>
                                                        <Input size="middle" />
                                                    </Form.Item>
                                                </div>

                                                <div className="category_item">
                                                    <Form.Item hasFeedback={true} name={'email'} label="Email address" rules={[{ required: true, message: 'Please fill!' }]}>
                                                        <Input size="middle" />
                                                    </Form.Item>
                                                </div>

                                                <div className="category_item">
                                                    <Form.Item hasFeedback={true} name={'password'} label="Password" rules={[{ required: true, message: 'Please fill!' }]}>
                                                        <Input.Password size="middle" />
                                                    </Form.Item>
                                                </div>

                                                <div className="category_item">
                                                    <Form.Item hasFeedback={true} name={'regno'} label="Registration number" rules={[{ required: true, message: 'Please fill!' }]}>
                                                        <Input size="middle" />
                                                    </Form.Item>
                                                </div>

                                                <div className="category_item">
                                                    <Form.Item hasFeedback={true} name={'phoneno'} label="Phone number" rules={[{ required: false, message: 'Please fill!' }]}>
                                                        <Input size="middle" />
                                                    </Form.Item>
                                                </div>

                                                <div className="category_item">
                                                    <Form.Item>
                                                        <Button type="primary" size="large" htmlType="submit" style={{ marginRight: 10 }}>SignUp</Button>
                                                    </Form.Item>
                                                </div>

                                            </div>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </section>
        </Content>

    </>
}




/* 

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}; */

export default LoginPage;