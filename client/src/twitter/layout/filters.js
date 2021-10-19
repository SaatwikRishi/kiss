import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { navigate } from '@reach/router'
import { DatePicker, Drawer, Input, Tooltip, Select } from 'antd';
const { Search } = Input;
import { CalendarFilled, ReloadOutlined, SyncOutlined, GlobalOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';
moment.tz.setDefault('America/Los_Angeles');

import { TweetsChat } from "../components/dashboard/index";
import _ from 'lodash';
import { getDashboardData, updateEvent, getUtilityData } from "../store/actions/index";

export const CommonDatePicker = (props) => {
    const dispatch = useDispatch();
    const dashboard = useSelector(state => state.dashboard);
    let date = dashboard.date;
    let country = dashboard.country;
    const dateFormat = "YYYY-MM-DD";
    const onChange = (date) =>{
        dispatch({ type: 'UPDATE_DATE', payload: moment(date).format(dateFormat)});
        dispatch(updateEvent({
            page_name:'ChangeDate-'+moment(date).format(dateFormat),
            duration:0
        }))
    }

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

    return <>
        <div className="_title_subMenu_dropdown">
            <div className="_icon_big"><GlobalOutlined /></div>
            <div className="_select_box">
                <div className="_sub_title">Select Country</div>
                <Select
                    style={{minWidth: 200}}
                    value={country}
                    onChange={(e) => dispatch({ type: 'UPDATE_COUNTRY_VALUE', payload: e}) }
                    optionFilterProp="children"
                    filterOption={(input, option) => option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    showSearch>
                    <Option key={'all'} value={'all'} name={'All'}>{'All'}</Option>
                    {(dashboard.countryList && dashboard.countryList.data && dashboard.countryList.data || []).map((val, key) =>
                        <Option key={key} value={val.value} name={val.label}>{val.label}</Option>
                    )}
                </Select>
            </div>
        </div>
        <div className="_title_subMenu_dropdown">
            <div className="_icon_big"><CalendarFilled /></div>
            <div className="_select_box">
                <div className="_sub_title">Select Date</div>
                <DatePicker
                    onChange={(e) => onChange(e)}
                    defaultValue={moment(dashboard.date)}
                    value={moment(dashboard.date)}
                    format={dateFormat}
                    allowClear={false}
                    disabledDate={val => moment(val).isAfter(moment.now()) || val.isSameOrBefore(moment().subtract(60, 'days'))}
                    size="small"
                />
            </div>
        </div>
    </>
}
export const CommonSearchTweets = (props) => {
    const dispatch = useDispatch();
    const dashboardData = useSelector(state => state.dashboard);
    let date = dashboardData.date;

    const onSearchInput = (e) => {
        dispatch({ type: 'UPDATE_SEARCH', payload: e });
    }
    const onChangeInput = (e) => {
        var text = e.target.value;
        if(text == ''){
            dispatch({ type: 'UPDATE_SEARCH', payload: '' });
        }else{
            if (location.pathname != '/search'){
                dispatch({ type: 'UPDATE_SEARCH', payload: text });
                setTimeout(() => { navigate('/search'); }, 50)
            }
        }
    }

    return <>
        <div className="header_search">
            {/* <div className="_icon_big"><SearchOutlined /></div> */}
            <div className="_select_box">
                <Search size='large'
                    showSearch
                    placeholder="Search tweets  . . ."
                    onSearch={(e) => onSearchInput(e)}
                    onChange={(e) => onChangeInput(e)}
                />
            </div>
        </div>
        <></>
    </>
}

/**
 * Drawer for Clicked section
 */
export const CommonChatDrawer = memo((props) => {
    let { title = '', data = [], setvisible } = props;

    return <>
        <Drawer
            className="tweets_drawer"
            title={title}
            width={720}
            onClose={()=> setvisible(false)}
            visible={true}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <TweetsChat data={data} />
        </Drawer>
    </>
})