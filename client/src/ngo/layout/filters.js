import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { navigate } from '@reach/router'
import { DatePicker, Drawer, Input, Tooltip, Select } from 'antd';
const { Search } = Input;
import { CalendarFilled, ReloadOutlined, SyncOutlined, GlobalOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';
moment.tz.setDefault('America/Los_Angeles');

import _ from 'lodash';

export const CommonSearchTweets = (props) => {
    const dispatch = useDispatch();
    const dashboardData = useSelector(state => state.dashboard);

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