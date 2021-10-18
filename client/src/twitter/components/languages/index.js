import React, { useEffect, memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {Tabs} from 'antd';
const { TabPane } = Tabs;
import { HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';

import {  updateEvent } from "../../store/actions/index";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

import ReactHighcharts from 'react-highcharts';


import {  TrendingChart, TweetsChat, TrendStatistic } from "../dashboard/index";
import { CommonDatePicker, CommonChatDrawer, RefreshTweeets } from "../../layout/filters";
const LanguagePage = memo((props) => {
    const dispatch = useDispatch();
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
                page_name:'languagePage',
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
        let langData = dashboard.langData ? dashboard.langData : {};
        return {

            allTweets: { loading: true, data: [], base: [], ...allTweets },
            langData: { loading: true, data: [], ...langData },
        }
    }
    let data = getStoreData();
    let languageCharts = _(data.allTweets.data).groupBy('lang').map((val, key) => ({ name: key, data: val, count: val.length })).orderBy('count').filter(val => val.name != "null").reverse().value() || [];


    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <GlobalOutlined style={{ color: "#52c41a" }} /> tweets language </div>
                <div className="_subTitle">tweets profile - language based dashboard</div>
            </div>
            <div className="filters">
                <CommonDatePicker />
                <RefreshTweeets />
            </div>
        </div>

        <div className="tending_country">
            <div className="trending card_box_round">
                <div class="card_card_box_title"> <GlobalOutlined className="title_icon" /> TWEETS PROFILE - LANGUAGE</div>
                <div className="centerbox mt20">
                    <LanguageChart allTweets={data.allTweets.data} data={data.langData.data} />
                </div>
            </div>
        </div>

        <TopCategoryTrending allTweets={data.allTweets.data} data={data.langData.data} loading={data.langData.loading} />

        <div className="card_box_round mt20">
            <Tabs className="CustomTab">
                {(() => {
                    return languageCharts.map((val, key) => <>
                        <TabPane key={key} tab={`${val.name} (${val.count})`}>
                            <TweetsChat data={val.data} />
                        </TabPane>
                    </>)
                })()}
            </Tabs>
        </div>

    </>
})
export default LanguagePage;


const TopCategoryTrending = memo(({allTweets, data, loading}) =>{
    return <div className="multiple_trending">
        {data.map(val=> <>
            <div className="card_box_round ">
                <div class="card_card_box_title"> {val.name} </div>
                <TrendStatistic data={[val]} />
                <div className="centerbox mt20">
                    <TrendingChart {...{
                        allTweets: _(allTweets).filter(v => v.lang == val.name).value(),
                        data:[{ data: val.data }],
                        loading:loading,
                        height: 250,
                    }}  /> 
                </div>
            </div>
        </>)}
    </div>
})

const LanguageChart = memo(({ allTweets = [], data }) => {

    /**
     * on Click User Profile
     */
    const [visible, setvisible] = useState(false);
    const [tweets, settweets] = useState({ title: '', data: [] });
    const onClickPoint = (e) => {
        settweets({ title: e.category, data: _(allTweets).filter(val => val.lang == e.category).value() });
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
                name: 'Today',
                color: '#2d6ccd',
                marker: { lineColor: '#2d6ccd' },
                data: _(data).map(val => val.sum).value()
            },
            {
                name: '4W Average',
                color: '#c2bfbc',
                marker: { lineColor: '#c2bfbc' },
                data: _(data).map(val => val.sumAvg).value()
            },
        ],
    }

    return <>
        <ReactHighcharts config={config} />
        {visible && <CommonChatDrawer {...{ data: tweets.data, setvisible, title: `User ID : ${tweets.title}` }} />}
    </>
})
