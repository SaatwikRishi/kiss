import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Layout, Avatar, Menu, Row, Col } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Footer } = Layout;
import logo from "../../assets/images/kiss.png";


const PortalFooter = (props) => { 
    return <>
        <Footer>
            <div className="center_layout ">
                <Row >
                    <Col span={8}>
                        <Menu mode="vertical" theme="dark">
                            <Menu.Item>Home</Menu.Item>
                            <Menu.Item>About us</Menu.Item>
                            <Menu.Item></Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={8}>

                    </Col>
                    <Col span={8}>
                        <h3>Contact US</h3>
                        <ul>
                            <li>dwiti.vikramaditya@gmail.com</li>
                            <li>ceo@kiss.ac.in</li>
                            <li>info@kiss.ac.in</li>
                        </ul>
                        <p>Write to:  KISS Bhubaneswar,<br/> Odisha,<br/>  India,<br/>PIN: 751024</p>
                    </Col>
                </Row>
            </div>
        </Footer>

    </>
}
export default PortalFooter;