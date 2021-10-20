import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Layout, Avatar, Menu, Row, Col } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;
import logo from "../../assets/images/kiss.png";


const PortalHeader = (props) => {
    const user = useSelector(state => state.user);
    const [state, setState] = useState()
    const handleClick = e => {
        setState(e.key);
    };
    return <>
        <div className="center_layout whitebg">
            <Row align="middle" justify="space-between">
                <Col span={18}>
                    <Header className="layout_header">
                        <div className="center_layout">
                            <div className="_left">
                                <div className="portal_logo">
                                    <img src={logo} />
                                </div>
                            </div>
                        </div>
                    </Header>
                </Col>
                <Col span={6}>
                    <Menu  mode="horizontal">
                        <Menu.Item icon={<SettingOutlined />} >My Profile</Menu.Item>
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
        <div className="menu_placeholder">
            <div className="center_layout">
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