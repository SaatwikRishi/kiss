import React, { useEffect, memo, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  navigate } from '@reach/router';
import { Tabs, Progress, Button, Image, Tooltip, List, Tag, Dropdown, Menu, notification } from 'antd';
const { TabPane } = Tabs;
import { SafetyCertificateTwoTone } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('America/Los_Angeles');
import axios from 'axios';

import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';
import mapShape from './mapShape';
import  {updateEvent} from '../../store/actions'
import { CommonDatePicker, CommonChatDrawer,  RefreshTweeets } from "../../layout/filters";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}


const Dashboard = memo((props) => {
    

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Add Category </div>
                <div className="_subTitle">Create Category form</div>
            </div>
            <div className="filters"></div>
        </div>



    

    </>
})
export default Dashboard;




// const dispatch = useDispatch();
    // const dashboardData = useSelector(state => state.dashboard);

/**
 * get data from Store
 */
    // const getStoreData = () =>{
    //     let dashboard = dashboardData[date] ? dashboardData[date]: {};
    //     dashboard = dashboard[country] ? dashboard[country] : {};
    //     return {
    //         allTweets: { loading: true, data: [], base: [], ...allTweets},
    //     }
    // }
    // let data = getStoreData();