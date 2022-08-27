import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { Layout, Spin } from 'antd';
const { Content } = Layout;
import { ReconciliationOutlined, FormOutlined } from '@ant-design/icons';
import { getUser, getAllEvents, getCategoryListforEvents, getAllTags } from '../ngo/store/actions';
import IndexPage from "./component/index";
import LoginPage from "./component/login";
import ProfilePage from "./component/profile";
import ChangePassword from "./component/changepassword";
import PortalHeader from "./layout/portalheader";
import PortalFooter from "./layout/portalFooter";
import EventDetails from "./component/events/eventDetails";
import MyEvents from "./component/myEvents";

import EventsList from "./component/eventslist";
import ListingView from "./component/listingsView";
import ChatBot from 'react-simple-chatbot';
import '../assets/css/portal.less'
import chatBot from '../assets/images/chat-bot.png'
import { ThemeProvider } from 'styled-components';
const KISSHomePage = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(state => state.user);
    const eventsStore = useSelector(state => state.events);
    /**
     * Scroll Top on Each Routing
     * user Tracking  . . .
     */

    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    }, [location.pathname])
    // Added by Saatwik 
    /**
     * Added a load data function which one by one loads the data 
     * and then updates the reducer at once. This should fix the 
     * undefined name bug
     */


    const  loadData = async () => {
        const user = await getUser();
        const categories = await getCategoryListforEvents();
        const tags = await getAllTags();
        const events = await getAllEvents();
        return {user, categories, tags, events};
    }

    

    const [loading, setloading] = useState(true);
    useEffect(() => {
        if (eventsStore.eventList.loading) {
            setloading(true);
           
           loadData().then(e => {
            dispatch(e.user);
            dispatch(e.categories);
            dispatch(e.tags);
            dispatch(e.events);
           })
            // dispatch(getUser());
            // dispatch(getAllTags());
            // dispatch(getAllEvents());
            // dispatch(getCategoryListforEvents());
            console.log(eventsStore.eventList);
        setloading(false);
        }
    }, []);


    return loading ? <>loading</>  : <>
        <Layout className="layout_portal">
            <GetChatBot loading={eventsStore.eventList.loading} events={eventsStore.eventList.data} />
            <Layout style={{ background: '#fff' }}>
                <PortalHeader />
                <section className="main-content">
                    <Layout className="layout_contentWrapper">
                        <Content>
                            <Router>
                                <IndexPage path="/home" />
                                <LoginPage path="/" />
                                <LoginPage path="/login" />
                                <ProfilePage path="/profile" />
                                <ChangePassword path="/changepassword" />
                                <EventDetails path="/event" />
                                <EventsList path="/eventslist" />
                                <MyEvents path="/myEvents" />

                                <ListingView path="/listing/:id" />
                            </Router>
                        </Content>
                    </Layout>
                </section>
                <PortalFooter />
            </Layout>
        </Layout>

    </>
}
export default KISSHomePage;


const GetChatBot = (props) => {
    console.log({ ...props })
    const { loading, events } = props
    const results = _(events).map((rec) => {
        return { value: rec.eventid, label: rec.event_name, trigger: 'response', onClick: (e) => console.log(e) }
    }).value()
    const steps = [
        {
            id: "welcome",
            message: `Hello, How may I help you ?`,
            trigger: "getInput",
        },
        {
            id: "getInput",
            user: true,
            trigger: "response",
        },
        {
            id: "response",
            message: 'Let me see for {previousValue}, just a moment',
            trigger: "result",
        },
        {
            id: "result",
            options: results
        }
    ]
    const theme = {
        background: '#f5f8fb',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        headerBgColor: '#3ea742',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#005993',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };
    if (!loading) {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot headerTitle="Chat with KISS Bot" steps={steps} floating={true} floatingIcon={<img src={chatBot} height={80} />} />
            </ThemeProvider>
        )
    } else {
        return (<></>)
    }

}

