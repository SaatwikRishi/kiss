import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import { Drawer, Alert, Tabs, Progress, Image } from 'antd';
const { TabPane } = Tabs;
import { HomeOutlined, AimOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';

import { getDashboardData, updateEvent  } from "../../store/actions/index";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

import { CategoryChart, TrendingChart, TweetsChat, TrendStatistic } from "../dashboard/index";
import { CommonDatePicker, RefreshTweeets } from "../../layout/filters";

const CategoryPage = memo((props) => {
    const dispatch = useDispatch();
    const dashboardData = useSelector(state => state.dashboard);
    const date = dashboardData.date;
    const country = dashboardData.country;
    const mountTime= moment();
    /**
     * get data from Store
     */
    const getStoreData = () => {
        let dashboard = dashboardData[date] ? dashboardData[date]: {};
        dashboard = dashboard[country] ? dashboard[country] : {};

        let allTweets = dashboard.allTweets ? dashboard.allTweets : {};
        let categoryData = dashboard.categoryData ? dashboard.categoryData : {};
        return {
            allTweets: { loading: true, data: [], base: [], ...allTweets },
            categoryData: { loading: true, data: [], ...categoryData },
        }
    }
    let data = getStoreData();
    useEffect(() => {       
        return () => {
            const unMountTime = moment()
            var ms = moment(unMountTime).diff(moment(mountTime));
            var duration = moment.duration(ms);
            dispatch(updateEvent({
                page_name:'intentPage',
                duration:duration.seconds()
            }))
        };
    },[]);

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <AimOutlined style={{color:"#52c41a"}} /> intents </div>
                <div className="_subTitle">top customer intents dashboard</div>
            </div>
            <div className="filters">
                <CommonDatePicker />
                <RefreshTweeets />
            </div>
        </div>

        <div className="tending_country">
            <div className="trending card_box_round">
                <div class="card_card_box_title"> <AimOutlined className="title_icon" /> Top Customer Intents </div>
                <div className="centerbox mt20">
                    <CategoryChart allTweets={data.allTweets.data} data={data.categoryData.data} loading={data.categoryData.loading} />
                </div>
            </div>
        </div>

        <TopCategoryTrending allTweets={data.allTweets.data} data={data.categoryData.data} loading={data.categoryData.loading} />

        <div className="card_box_round mt20">
            <Tabs className="CustomTab">
                {(() => {
                    let temp = _(data.allTweets.data).groupBy('intent').map((val, key) => ({ name: key, data: val, count: val.length })).orderBy('count').reverse().value() || [];
                    return temp.map( (val,key)=><>
                        <TabPane key={key} tab={`${val.name} (${val.count})`}>
                            <TweetsChat data={val.data} />
                        </TabPane>
                    </>)
                })()}
            </Tabs>
        </div>

    </>
})
export default CategoryPage;


const TopCategoryTrending = memo(({allTweets, data, loading}) =>{
    return <div className="multiple_trending">
        {data.map(val=> <>
            <div className="card_box_round ">
                <div class="card_card_box_title"> {val.name} </div>
                <TrendStatistic data={[val]} />
                <div className="centerbox mt20">
                    <TrendingChart {...{
                        allTweets: _(allTweets).filter(v => v.intent == val.name ).value(),
                        data:[{ data: val.data }],
                        loading:loading,
                        height: 250,
                    }}  /> 
                </div>
            </div>
        </>)}
    </div>
})