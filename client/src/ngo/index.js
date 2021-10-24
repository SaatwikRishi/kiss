import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';  
import '../assets/css/style.less';

import { Layout, Spin } from 'antd';
const { Content } = Layout;
import { ContainerOutlined, FormOutlined, TagOutlined, TeamOutlined, SolutionOutlined, ProfileOutlined, CommentOutlined, FundOutlined } from '@ant-design/icons';
import { getUser } from './store/actions';

import LayoutHeader from "./layout/layoutHeader";
import CreateCategory from "./components/category/new";
import Eventforms from "./components/events/eventforms";
import CreateEvent from "./components/events/new";
import ListEvents from "./components/events/list";
import CreateTag from "./components/events/createtag";
import ListTags from "./components/events/listtags";
import ListCategory from "./components/category/list";
import CreateStdCategory from "./components/students/createstdcategory";
import ListStdCategory from "./components/students/liststdcategory";
import CreateStdProfile from "./components/students/create";
import ListStudents from "./components/students/list";
import ListComments from "./components/events/listcomments";
import AdmDashboard from "./components/dashboard";

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
        dispatch(getUser());
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
                        <Layout className="layout_contentWrapper" style={{ padding: '10px 50px'}}>
                            <Content>
                                <Router>
                                    <CreateEvent path="/events/new" />
                                    <CreateEvent path="/events/new/:eventId" />
                                    <Eventforms path="/events/eventforms" />
                                    <ListEvents path="/events/list" />
                                    <CreateTag path="/events/createtag" />
                                    <CreateTag path="/events/createtag/:id" />
                                    <ListTags path="/events/listtags" />
                                    <CreateCategory path="/category/new"/>
                                    <CreateCategory path="/category/new/:catId" />
                                    <ListCategory path="/category/list"/>
                                    <CreateStdCategory path="/students/createstdcategory"/>
                                    <CreateStdCategory path="/students/createstdcategory/:catId"/>
                                    <ListStdCategory path="/students/liststdcategory"/>
                                    <CreateStdProfile path="/students/create"/>
                                    <CreateStdProfile path="/students/create/:id"/>
                                    <ListStudents path="/students/list"/>
                                    <ListComments path="/events/listcomments"/>
                                    <AdmDashboard path="/"/>
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
                <li className={url == '/admin/' ? 'active' : ''} onClick={() => navigateTo('/admin/')}>
                    <FundOutlined />
                    <div className="_title">Dashboard</div>
                </li>
                <li className={url == '/admin/category/list' ? 'active' : ''} onClick={() => navigateTo('/admin/category/list')}>
                    <ContainerOutlined />
                    <div className="_title">Event Category</div>
                </li>
                <li className={url == '/admin/events/list' ? 'active' : ''} onClick={() => navigateTo('/admin/events/list')}>
                    <ProfileOutlined />
                    <div className="_title">Events</div>
                </li>
                <li className={url == '/admin/students/list' ? 'active' : ''} onClick={() => navigateTo('/admin/students/list')}>
                    <TeamOutlined />
                    <div className="_title">Students</div>
                </li>
                <li className={url == '/admin/students/liststdcategory' ? 'active' : ''} onClick={() => navigateTo('/admin/students/liststdcategory')}>
                    <SolutionOutlined />
                    <div className="_title">Student Dynamic Fields</div>
                </li>
                <li className={url == '/admin/events/eventforms' ? 'active' : ''} onClick={() => navigateTo('/admin/events/eventforms')}>
                    <FormOutlined />
                    <div className="_title">Registered Forms</div>
                </li>
                <li className={url == '/admin/events/listtags' ? 'active' : ''} onClick={() => navigateTo('/admin/events/listtags')}>
                    <TagOutlined />
                    <div className="_title">Tags</div>
                </li>
                <li className={url == '/admin/events/listcomments' ? 'active' : ''} onClick={() => navigateTo('/admin/events/listcomments')}>
                    <CommentOutlined />
                    <div className="_title">Comments</div>
                </li>
            </ul>
        </div>
    </>
}