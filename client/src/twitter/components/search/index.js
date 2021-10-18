import React, { useEffect, memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Tabs} from 'antd';
const { TabPane } = Tabs;

import _ from 'lodash'
import moment from 'moment-timezone';

import {  updateEvent } from "../../store/actions/index";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

import {TweetsChat } from "../dashboard/index";


const SearchPage = memo((props) => {
    const dispatch = useDispatch();
    const dashboardData = useSelector(state => state.dashboard);
    const date = dashboardData.date;
    const country = dashboardData.country;
    const text = dashboardData.text;
    const mountTime= moment();

    useEffect(() => {       
        return () => {
            const unMountTime = moment()
            var ms = moment(unMountTime).diff(moment(mountTime));
            var duration = moment.duration(ms);
            dispatch(updateEvent({
                page_name:'searchPage',
                duration:duration.seconds()
            }))
        };
    },[]);

    /**
     * get data from Store
     */
    const getStoreData = () => {
        let dashboard = dashboardData[date] ? dashboardData[date]: {};
        dashboard = dashboard[country] ? dashboard[country] : {};
        
        let allTweets = dashboard.allTweets ? dashboard.allTweets : {};
        return {
            allTweets: { loading: true, data: [], base: [], ...allTweets }
        }
    }
    let data = getStoreData();

    let searchData = [];
    if(text){
        searchData = data.allTweets.data.filter(o =>
            Object.keys(o).some(k => String(decodeURIComponent(o[k]))
            .toLowerCase().includes(text ? text.toLowerCase(): '') ))
        setTimeout(() => { window.find(text); }, 50)
    } else{
        searchData = data.allTweets.data;
        window.find('');
    }
    

    return <>
        <br />
        <div className="search_tweets_page">
            <Tabs className="CustomTab" onChange={() => { 
                window.find(''); 
                text && setTimeout(() => { window.find(text); }, 300)} 
            }>
                <TabPane key="1" tab="ALL TWEETS">
                    {(() => {
                        let _chatData = _(searchData).orderBy('event_date').reverse().value()
                        return <TweetsChat data={_chatData} />
                    })()}
                </TabPane>
                <TabPane key="2" tab="TWEETS BY COMMENTS">
                    {(() => {
                        let temp = _(searchData).orderBy('commentsCount').reverse().value();
                        return <TweetsChat data={temp} />
                    })()}
                </TabPane>
                <TabPane key="3" tab="TOP RETWEETS">
                    {(() => {
                        let temp = _(searchData).orderBy('retweet_count').reverse().value();
                        return <TweetsChat data={temp} />
                    })()}
                </TabPane>
                <TabPane key="4" tab="TWEETS BY FOLLOWED">
                    {(() => {
                        let temp = _(searchData).orderBy('followers_count').reverse().value();
                        return <TweetsChat data={temp} />
                    })()}
                </TabPane>
            </Tabs>
        </div>
    </>
})
export default SearchPage;