import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Layout, Avatar, Menu, Row, Col } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Footer } = Layout;
import logo from "../../assets/images/kiss.png";
import { InlineFollowButtons } from 'sharethis-reactjs';

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
                            <li>apratim.tiwari@kiss.ac.in</li>
                            <li>shweta.kochatta@kiit.ac.in</li>
                        </ul>
                    </div>
                </div>
                <div className="footer_box">
                    <div className="footer_contact_title">Address</div>
                    <div className="footer_contact_addrs">
                        <p>Write to:<br /> KISS Campus-3,<br /> Bhubaneswar, Odisha, India,<br />PIN: 751024</p>
                    </div>
                </div>
                <div className="footer_box">
                    <div className="footer_contact_share">
                        <InlineFollowButtons

                            config={{

                                action: 'Follow us:', // call to action (STRING)

                                action_enable: true,  // show/hide call to action (true, false)

                                action_pos: 'bottom', // position of call to action (left, top, right)

                                alignment: 'center',  // alignment of buttons (left, center, right)

                                color: 'white',       // set the color of buttons (social, white)

                                enabled: true,        // show/hide buttons (true, false)

                                networks: [           // which networks to include (see FOLLOW NETWORKS)

                                    'twitter',

                                    'facebook',

                                    'instagram',

                                    'youtube'

                                ],

                                padding: 8,           // padding within buttons (INTEGER)

                                profiles: {           // social profile links for buttons

                                    twitter: 'kissfoundation',

                                    facebook: 'kissfoundation',

                                    instagram: 'kissfoundation',

                                    youtube: '/c/KISSFoundation'

                                },

                                radius: 9,            // the corner radius on each button (INTEGER)

                                size: 48,             // the size of each button (INTEGER)

                                spacing: 8            // the spacing between buttons (INTEGER)

                            }}

                        />
                    </div>
                </div>
            </div>
        </Footer>

    </>
}
export default PortalFooter;
