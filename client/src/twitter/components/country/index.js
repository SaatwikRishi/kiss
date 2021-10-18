import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {Tabs } from 'antd';
const { TabPane } = Tabs;
import {  GlobalOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';

import {  updateEvent } from "../../store/actions/index";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

import {  TrendingChart, TweetsChat, CountryMap, TopFiveCountrys, TrendStatistic } from "../dashboard/index";
import { CommonDatePicker, RefreshTweeets } from "../../layout/filters";
const CountryPage = memo((props) => {
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
                page_name:'countryPage',
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
        let countryData = dashboard.countryData ? dashboard.countryData : {};
        return {

            allTweets: { loading: true, data: [], base: [], ...allTweets },
            countryData: { loading: true, data: [], ...countryData },
        }
    }
    let data = getStoreData();
    let CountryCharts = _(data.allTweets.data).groupBy('country').map((val, key) => ({ name: key, data: val, count: val.length })).orderBy('count').filter(val=> val.name !="null").reverse().value() || [];


    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <GlobalOutlined style={{ color: "#52c41a" }} /> countries </div>
                <div className="_subTitle">twitter profile -  countries based dashboard</div>
            </div>
            <div className="filters">
                <CommonDatePicker />
                <RefreshTweeets />
            </div>
        </div>

        <div className="country card_box_round">
            <div class="card_card_box_title"><GlobalOutlined className="title_icon" /> Twitter Profile -  Countries </div>
            <div class="country_status_bar">
                <div class="_country">
                    <CountryMap allTweets={data.allTweets.data} data={data.countryData.data} loading={data.countryData.loading} />
                </div>
                <div class="_status_bar">
                    <TopFiveCountrys allTweets={data.allTweets.data} data={data.countryData.data} loading={data.countryData.loading} />
                </div>
            </div>
        </div>

        <TopCategoryTrending allTweets={data.allTweets.data} data={data.countryData.data} loading={data.countryData.loading} />

        <div className="card_box_round mt20">
            <Tabs className="CustomTab">
                {(() => {
                    return CountryCharts.map((val, key) => <>
                        <TabPane key={key} tab={`${val.name} (${val.count})`}>
                            <TweetsChat data={val.data} />
                        </TabPane>
                    </>)
                })()}
            </Tabs>
        </div>

    </>
})
export default CountryPage;


const TopCategoryTrending = memo(({allTweets, data, loading}) =>{
    let regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

    let allData = _(data).take(8).value();

    return <div className="multiple_trending">
        {allData.map( (val,key)=> <>
            {val.name != "null" && <div key={key} className="card_box_round ">
                <div class="card_card_box_title"> 
                {
                    (()=>{
                        try { return regionNamesInEnglish.of(val.name) } catch (r) { return val.name }
                    })()
                }
                </div>
                <TrendStatistic data={[val]} />
                <div className="centerbox mt20">
                    <TrendingChart {...{
                        allTweets: _(allTweets).filter(v => v.country_code == val.name).value(),
                        data:[{ data: val.data}],
                        loading:loading,
                        height: 250,
                    }}  /> 
                </div>
            </div>}
        </>)}
    </div>
})