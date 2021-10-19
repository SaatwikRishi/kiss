import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';  
import '../assets/css/style.less';

import { Layout, Spin } from 'antd';
const { Content } = Layout;
import { DashboardOutlined } from '@ant-design/icons';
import { updateUser } from './store/actions';

import LayoutHeader from "./layout/layoutHeader";
import CreateCategory from "./components/category/new";
import ListCategory from "./components/category/list";
import CreateStdCategory from "./components/students/createstdcategory";
import ListStdCategory from "./components/students/liststdcategory";

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
            <Layout className="layout_main layout_alex">
                {loading && <div class="progress">
                    <div class="color"></div>
                </div>}
                <Layout>
                    <LayoutHeader />
                    <section className="layout_section">
                        <LayoutSidebar />
                        <Layout className="layout_contentWrapper">
                            <Content>
                                <Router>
                                    <CreateCategory path="/"/>
                                    <CreateCategory path="/category/new"/>
                                    <ListCategory path="/category/list"/>
                                    <CreateStdCategory path="/students/createstdcategory"/>
                                    <ListStdCategory path="/students/liststdcategory"/>
                                </Router>
                            </Content>
                        </Layout>
                    </section>
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
                <li className={url == '/'? 'active' :'' } onClick={() => navigateTo('/')}>
                    <DashboardOutlined />
                    <div className="_title">Dashboard</div>
                </li>
            </ul>
        </div>
    </>
}