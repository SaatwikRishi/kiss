import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link, navigate } from '@reach/router';
import { Layout, Avatar, Menu, Row, Col, Dropdown } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined, UserOutlined, AppstoreAddOutlined } from '@ant-design/icons';
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
    const { SubMenu } = Menu;
    return <>
        <div className="header_cont" style={{ background: '#fff' }}>
            <div className="main-content">
                <Row align="middle" justify="space-between">
                    <Col span={4}>
                        <Header className="layout_header">
                            <div className="_left">
                                <div className="portal_logo">
                                    <img src={logo} />
                                </div>
                            </div>
                        </Header>
                    </Col>
                    <Col span={15} offset={1}>
                        <Menu onClick={(e) => handleClick(e)} selectedKeys={state} mode="horizontal">
                            <Menu.Item key="mail" icon={<HomeOutlined />} onClick={() => navigate('/home')} >
                                <a rel="noopener noreferrer" >Home</a>
                            </Menu.Item>
                            <Menu.Item key="alipay" onClick={() => navigate('/event')}>
                                <a rel="noopener noreferrer" >Events List</a>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4}>
                        <Menu onClick={(e) => handleClick(e)} selectedKeys={state} mode="horizontal">
                            <SubMenu key="SubMenu" title=
                                {<Avatar.Group >
                                    <Avatar style={{ marginTop: 10 }} src={`https://bridgeimages.paypalcorp.com/images/120120/${user.qid}.jpg?q=1608221763557`}><span>{user.name}</span></Avatar>
                                    <div className="userinfo"><span className="username">{user.firstname} {user.lastname} </span></div>
                                </Avatar.Group>}>
                                <Menu.Item key="setting:1">Profile</Menu.Item>
                                <Menu.Item key="setting:2">Logout</Menu.Item>
                            </SubMenu>
                        </Menu>

                    </Col>
                </Row>
            </div>
        </div>
        <div className="banner_placeholder">
            <div className="main-content">
                <Row gutter={[24, 24]} align="stretch" justify="space-between" >
                    <Col span={6} className="statistics">
                        <div className="icon"><UserOutlined /> </div>
                        <div className="text"> 4000 Students</div>
                    </Col>
                    <Col span={6} className="statistics">
                        <div className="icon"><AppstoreOutlined /> </div>
                        <div className="text">75 Events</div>
                    </Col>
                    <Col span={6} className="statistics">
                        <div className="icon"><AppstoreAddOutlined /> </div>
                        <div className="text"> 50 Jobs</div>
                    </Col>
                </Row>
            </div>
        </div>

    </>
}
export default PortalHeader;


/*

*/