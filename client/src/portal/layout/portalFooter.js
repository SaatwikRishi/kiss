import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Layout, Avatar, Menu, Row, Col } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Footer } = Layout;
import logo from "../../assets/images/kiss.png";


const PortalFooter = (props) => { 
    return <>
        <Footer>
            <div className="footer_wrapper main-content">
                <div className="footer_box">
                    <div className="footer_logo_name">Kalinga Institute of Social Sciences, Bhubaneswar</div>
                    <div className="footer_des">
                        Beginning in 1992, we have made concerted efforts towards inclusive education, women empowerment, tribal uplift and sustainable development
                    </div>
                </div>
                <div className="footer_box">
                    <div className="footer_contact_title">Contact US</div>
                    <div className="footer_contact_link"> 
                        <ul>
                            <li>dwiti.vikramaditya@gmail.com</li>
                            <li>ceo@kiss.ac.in</li>
                            <li>info@kiss.ac.in</li>
                        </ul>
                    </div>
                </div>
                <div className="footer_box">
                    <div className="footer_contact_title">Address</div>
                    <div className="footer_contact_addrs">
                        <p>Write to:  KISS Bhubaneswar,<br /> Odisha,<br />  India,<br />PIN: 751024</p>
                    </div>
                </div>
            </div>
        </Footer>

    </>
}
export default PortalFooter;