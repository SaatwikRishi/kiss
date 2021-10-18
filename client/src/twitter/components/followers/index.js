import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import { Drawer, Alert, Tabs, Progress, Image } from 'antd';
const { TabPane } = Tabs;
import { HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';
import {  updateEvent } from "../../store/actions/index";
import ReactHighcharts from 'react-highcharts';


export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

import { TweetsChat } from "../dashboard/index";
import { CommonDatePicker, CommonChatDrawer, RefreshTweeets } from "../../layout/filters";
const FollowersPage = memo((props) => {
    const dispatch = useDispatch();
    const dashboard = useSelector(state => state.dashboard);
    const dashboardData = useSelector(state => state.dashboard);
    const date = dashboardData.date;
    const country = dashboardData.country;

    const mountTime= moment();

    useEffect(() => {       
        return () => {
            const unMountTime = moment()
            var ms = moment(unMountTime).diff(moment(mountTime));
            var duration = moment.duration(ms);
            dispatch(updateEvent({
                page_name:'topFollowersPage',
                duration:duration.seconds()
            }))
        };
    },[]);
    /**
     * get data from Store
     */
    const getStoreData = () => {
        let dashboard = dashboardData[date] ? dashboardData[date] : {};
        dashboard = dashboard[country] ? dashboard[country] : {};
        
        let allTweets = dashboard.allTweets ? dashboard.allTweets : {};
        let categoryData = dashboard.categoryData ? dashboard.categoryData : {};
        return {
            allTweets: { loading: true, data: [], base: [], ...allTweets },
            categoryData: { loading: true, data: [], ...categoryData },
        }
    }
    let data = getStoreData();

    let userData = _(data.allTweets.data).groupBy('screen_name').map((val, key) => {
        return {
            count: val.length,
            name: decodeURIComponent(val[0].name),
            screen_name: val[0].screen_name,
            followers_count: val[0].followers_count,
            retweet_count: val[0].retweet_count,
            data: val
        }
    }).uniqBy('screen_name').orderBy('followers_count').reverse().take(20).value()

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <UsergroupAddOutlined style={{ color: "#52c41a" }} /> followed profiles </div>
                <div className="_subTitle">tweets by most followed profiles dashboard</div>
            </div>
            <div className="filters">
                <CommonDatePicker />
                <RefreshTweeets />
            </div>
        </div>

        <div className="tending_country">
            <div className="trending card_box_round">
                <div class="card_card_box_title"> <UsergroupAddOutlined className="title_icon" /> Tweets by Most Followed Profiles </div>
                <div className="centerbox mt20">
                    <FollowersChart allTweets={data.allTweets.data} data={userData} />
                </div>
            </div>
        </div>

        <div className="card_box_round mt20">
            <Tabs className="CustomTab">
                {(() => {
                    return userData.map( (val,key)=><>
                        <TabPane key={key} tab={`${val.name} (${val.count})`}>
                            <TweetsChat data={val.data} />
                        </TabPane>
                    </>)
                })()}
            </Tabs>
        </div>

    </>
})
export default FollowersPage;


const FollowersChart = memo(({allTweets=[],data}) =>{

    /**
     * on Click User Profile
     */
    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({ title: '', data: [] });
    const onClickPoint = (e) => {
        settweets({ title: e.category, data: _(allTweets).filter(val => val.name == encodeURIComponent(e.category) ).value() });
        setvisible(true);
    }


    let config = {
        chart: {
            type: 'column',
            height: 320,
            zoomType: 'x',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        colors: ['#2d6ccd', '#c2bfbc', '#ef6262'],
        legend: {
            padding: 0,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            itemStyle: {
                fontSize: '10px',
                textTransform: 'uppercase'
            },
            enabled: true
        },
        yAxis: {
            gridLineColor: '#f0f0f0',
            gridLineDashStyle: 'dash',
            lineWidth: 0,
            title: {
                text: ''
            },
            labels: {
                enabled: true,
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                // stacking: 'normal',
                borderRadius: 2,
                fillOpacity: 0.5,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            onClickPoint(this)
                        }
                    }
                }
            },
        },
        xAxis: {
            categories: _(data).map(val => val.name).value(),
            // crosshair: true,
            labels: {
                enabled: true
            }
        },
        series: [
            {
                name: 'Tweets',
                color: '#2d6ccd',
                marker: { lineColor: '#2d6ccd' },
                data: _(data).map(val => val.count).value()
            }
        ],
    }

    return <>
        <ReactHighcharts config={config} />
        {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `User ID : ${tweets.title}` }} />}
    </>
})

