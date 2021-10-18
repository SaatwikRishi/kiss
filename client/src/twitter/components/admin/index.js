import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { Alert, Tabs, Button, Table, Tag, Space, List, Select } from 'antd';
const { TabPane } = Tabs;
import { RobotOutlined, EditOutlined, AimOutlined, DashboardOutlined, SearchOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';

import { updateEvent  } from "../../store/actions/index";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

const AdminPage = memo((props) => {
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

        let intends = dashboardData.intends ? dashboardData.intends : {};
        return {
            intends: { loading: true, data: [], ...intends },
        }
    }
    let data = getStoreData();
    useEffect(() => {
        return () => {
            const unMountTime = moment()
            var ms = moment(unMountTime).diff(moment(mountTime));
            var duration = moment.duration(ms);
            dispatch(updateEvent({
                page_name:'adminPage',
                duration:duration.seconds()
            }))
        };
    },[]);

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <DashboardOutlined style={{color:"#52c41a"}} /> Admin </div>
                <div className="_subTitle">intents admin dashboard</div>
            </div>
            <div className="filters"></div>
        </div>

        <div className="admin_card">
            <div className="trending card_box_round">
                <div className="centerbox">
                    <RenderIntendTable data={data.intends} />
                </div>
            </div>
        </div>

    </>
})
export default AdminPage;



const RenderIntendTable = (props) =>{
    let { data = [], loading = true } = props.data;

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const filterDropdown = (dataIndex) => {
        var filter = _(data).map(dataIndex).filter().uniq().value().map((rec) => { return { value: rec } });
        return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: '20px 10px' }}>
                    <Space>
                        <Select
                            style={{ width: 350 }}
                            mode="multiple"
                            allowClear={true}
                            showArrow
                            onChange={e => {
                                setSelectedKeys(e ? e : []);
                                e.length == 0 && handleSearch(selectedKeys, confirm, dataIndex);
                            }}
                            options={filter}
                        />
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="middle"
                        ></Button>
                    </Space>
                </div>
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '',
        }
    }
    const columns = [
        {
            title: 'Intents',
            dataIndex: 'name',
            key: 'name',
            className: '',
            render: text => <p>{text}</p>,
            sorter: (a, b) => NumberStringSort(a, b, 'name'), 
            align: 'left',
            ...filterDropdown('name'),
        },
        {
            title: 'Actions',
            key: 'tags',
            dataIndex: 'tags',
            render: (i, row) => {
                console.log(row);
                return <>
                    <Space>
                        <a className="action_links" onClick={() => navigate(`/admin/trainIntents/${row.id}`)} ><EditOutlined />Train Intend</a>
                    </Space>
                </>;
            }
        },
    ];

    return <Table 
    className="adminIntendstable"
    size="small"
    columns={columns} 
    pagination={{
        showTotal: (total) => { return <p>Total Items :{total}</p> },
        showSizeChanger: true
    }}
    dataSource={data} />
}

/**
 * Table Number an String sort
 */
export const NumberStringSort = (a, b, col = '') => {
    if (col) {
        if (typeof a[col] === "string" && typeof b[col] === "string") {
            var nameA = a[col] != null ? a[col].toUpperCase() : '';
            var nameB = b[col] != null ? b[col].toUpperCase() : '';
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        } else {
            return a[col] - b[col];
        }
    } else {
        return a - b;
    }
}