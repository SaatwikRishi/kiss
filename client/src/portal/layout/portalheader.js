import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link, navigate } from '@reach/router';
import { Layout, Avatar, Menu, Row, Col } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";

const { Header } = Layout;
import logo from "../../assets/images/kiss.png";


const PortalHeader = (props) => {
    const user = useSelector(state => state.user);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    //console.log({ auth, provider })

    const [state, setState] = useState()
    const handleClick = e => {
        setState(e.key);
    };

    const checkLogin = (auth) => {
        if(auth.currentUser) {
            navigate('/profile')
        }
        else {
            //navigate('/login')
            navigate('/profile')
        }
    }
    return <>
        <div className="" style={{background: '#fff'}}>
            <div className="main-content">
                <Row align="middle" justify="space-between">
                    <Col span={12}>
                        <Header className="layout_header">
                            <div className="_left">
                                <div className="portal_logo">
                                    <img src={logo} />
                                </div>
                            </div>
                        </Header>
                    </Col>
                    <Col span={12}>
                        <Menu mode="horizontal" style={{ float: "right"}}>
                            <Menu.Item icon={<SettingOutlined />} onClick={() => checkLogin(auth)}>My Profile</Menu.Item>
                            <Menu.Item>
                                <Avatar.Group size="large">
                                    <Avatar size="large" src={`https://bridgeimages.paypalcorp.com/images/120120/${user.qid}.jpg?q=1608221763557`}><span>{user.name}</span></Avatar>
                                    <div className="userinfo"><span className="username">{user.name}</span></div>
                                </Avatar.Group>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        </div>
        <div className="menu_placeholder">
            <div className="main-content">
                <Menu theme="dark" onClick={(e) => handleClick(e)} selectedKeys={state} mode="horizontal">
                    <Menu.Item key="mail" icon={<HomeOutlined />}>Home</Menu.Item>
                    <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
                        Navigation Two
                    </Menu.Item>
                    <Menu.Item key="alipay">
                        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                            Navigation Four - Link
                        </a>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    </>
}
export default PortalHeader;