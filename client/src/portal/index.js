import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';  
import { Layout, Spin } from 'antd';
const { Content } = Layout;
import { ReconciliationOutlined, FormOutlined } from '@ant-design/icons';
import { updateUser } from '../ngo/store/actions';
import IndexPage from "./component/index";
import LoginPage from "./component/login";
import ProfilePage from "./component/profile";
import PortalHeader from "./layout/portalheader";
import PortalFooter from "./layout/portalFooter";
import PortalBanner from "./layout/portalbanner";

import EventDetails from "./component/events/eventDetails";

import '../assets/css/portal.less' 

const Index = (props)=>{ 
    const dispatch = useDispatch();
    const location = useLocation();

    /**
     * Scroll Top on Each Routing
     * user Tracking  . . .
     */

    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    }, [location.pathname])
    
    const [loading, setloading] = useState(false);
    useEffect(() => {
        dispatch(updateUser());
    },[]);
   
    return <>
            <Layout className="layout_portal">
                {/* loading && <div class="progress">
                    <div class="color"></div>
                </div> */}
                <Layout>
                    <PortalHeader />
                    {/* <PortalBanner /> */}
                    <section className="main-content">
                        <Layout className="layout_contentWrapper">
                            <Content>
                                <Router>
                                    <IndexPage path="/" />                                  
                                    <LoginPage path="/login" />                                 
                                    <ProfilePage path="/profile" />                                  
                                    <EventDetails path="/event/:eventId" />
                                </Router>
                            </Content>
                        </Layout>
                    </section>
                    <PortalFooter/>
                </Layout>
            </Layout>
            
        </>
}
export default Index;



/**
 * Layout Sidebar
 */
const LayoutSidebar = (props) =>{

    const [expand, setexpand] = useState(false);
    const [url, seturl] = useState('/');
    const navigateTo = (url) =>{
        navigate(url);
        seturl(url);
    }
    return <>
        <div className={`main_sidebar ${expand? 'expand': ''}`} onMouseEnter={() => setexpand(true)} onMouseLeave={() => setexpand(false)}>
            <ul>
                <li className={url == '/events/new' ? 'active' : ''} onClick={() => navigateTo('/events/new')}>
                    <FormOutlined />
                    <div className="_title">New Events</div>
                </li>
                <li className={url == '/category/new' ? 'active' : ''} onClick={() => navigateTo('/category/new')}>
                    <ReconciliationOutlined />
                    <div className="_title">New Category</div>
                </li>
            </ul>
        </div>
    </>
}