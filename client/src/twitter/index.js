import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';  
import '../assets/css/style.less';

import { Layout, Spin } from 'antd';
const { Content } = Layout;
import { DashboardOutlined, AimOutlined, GlobalOutlined, SecurityScanOutlined, FlagOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { updateUser, getDashboardData, getUtilityData } from './store/actions';

import LayoutHeader from "./layout/layoutHeader";
import Dashboard from "./components/dashboard";
import CategoryPage from "./components/category";
import CountryPage from "./components/country";
import LanguagePage from "./components/languages";
import FollowersPage from "./components/followers";
import SearchPage from "./components/search";

import AdminPage from "./components/admin";
import TrainIntents from "./components/admin/trainIntends";

const Index = (props)=>{
    const dispatch = useDispatch();
    const location = useLocation()
    const dashboard = useSelector(state => state.dashboard);
    let date = dashboard.date;
    let country = dashboard.country;

    /**
     * Scroll Top on Each Routing
     * user Tracking  . . .
     */
    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50)       
    }, [location.pathname])
    
    const [loading, setloading] = useState(false);
    useEffect(() => {
        dispatch(updateUser());
    },[]);

    useEffect(() => {
        if (!dashboard[date]){
            setloading(true);
        } else if (!dashboard[date][country]){
            setloading(true);
        }else{
            setloading(false);
        }
    }, [dashboard])

    /**
     * Get Dashboard Data
     */
    useEffect(() => {
        if(!dashboard[date]){
            dispatch(getDashboardData(dashboard.date, country));
        } else if (!dashboard[date][country]){
            dispatch(getDashboardData(dashboard.date, country));
        }
    }, [date, country]);

    /**
     * get Country List Data
     */
    useEffect(() => {
        dispatch(getUtilityData());
    }, []);

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
                                    <Dashboard path="/"/>
                                    <CategoryPage path="/intent"/>
                                    <CountryPage path="/country"/>
                                    <LanguagePage path="/language"/>
                                    <FollowersPage path="/followers"/>
                                    <SearchPage path="/search"/>
                                    <AdminPage path="/admin"/>
                                    <TrainIntents path="/admin/trainIntents/:id"/>

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
                <li className={url == '/intent'? 'active': '' } onClick={() => navigateTo('/intent')}>
                    <AimOutlined />
                    <div className="_title">Intents</div>
                </li>
                <li className={url == '/country'? 'active': '' } onClick={() => navigateTo('/country')}>
                    <GlobalOutlined />
                    <div className="_title">Country</div>
                </li>
                <li className={url == '/language'? 'active': '' } onClick={() => navigateTo('/language')}>
                    <FlagOutlined />
                    <div className="_title">Language</div>
                </li>
                <li className={url == '/followers'? 'active': '' } onClick={() => navigateTo('/followers')}>
                    <UsergroupAddOutlined />
                    <div className="_title">Followers</div>
                </li>
                <li className={url == '/admin'? 'active': '' } onClick={() => navigateTo('/admin')}>
                    <SecurityScanOutlined />
                    <div className="_title">Admin</div>
                </li>
            </ul>
        </div>
    </>
}