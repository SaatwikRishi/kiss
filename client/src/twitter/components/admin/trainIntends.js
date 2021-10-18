import React, { useEffect, memo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import { Alert, Tabs, Button, Table, Tag, Space, List, Select, Input, notification } from 'antd';
const { TabPane } = Tabs;
const { Search } = Input;
import { EditOutlined, DeleteOutlined, DashboardOutlined, SendOutlined } from '@ant-design/icons';
import _ from 'lodash'
import moment from 'moment-timezone';
import axios from 'axios';

import { updateEvent } from "../../store/actions/index";
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

const TrainIntents = memo((props) => {
    const dispatch = useDispatch();
    const dashboardData = useSelector(state => state.dashboard);
    const date = dashboardData.date;
    const country = dashboardData.country;
    const mountTime = moment();

    const [search, setsearch] = useState('');
    const [data, setdata] = useState({ data: [], details: { name: "Train Intents", status: 1, id: props.id}});
    const [loading, setloading] = useState(false);
    useEffect(() => {
        props.id && axios.get(`/twitter/api/getIntentTrainDetails?id=${props.id}`).then(res=>{
            res.data.result && setdata({ ...data, ...res.data.result});
        })
    },[])

    const DeleteInseart = (obj) =>{
        setloading(true);
        axios.post(`/twitter/api/updateIntentTrainDetails`, obj).then(res => {
            axios.get(`/twitter/api/getIntentTrainDetails?id=${props.id}`).then(res => {
                res.data.result && setdata({ ...data, ...res.data.result });
                notification.success({ description: `Success!` });
                setloading(false);
            }).catch(err => {
                setloading(false);
            })
        }).catch(err => {
            setloading(false);
        });
    }

    const onUpdate = (e) =>{
        let text = e.trim();
        if(text){
            setloading(true);
            DeleteInseart({ intent_id: data.details.id, data: _.uniq([e, ...data.data]), status: data.details.status });
            setsearch('');
        }
    }
    const deleteTrain = (index) =>{
        let temp = [...data.data]; temp.splice(index, 1);
        DeleteInseart({ intent_id: data.details.id, data: _.uniq([...temp]), status: data.details.status })
    }

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <DashboardOutlined style={{ color: "#52c41a", marginRight: 5 }} />{data.details.name}</div>
                <div className="_subTitle">Train Intents dashboard</div>
            </div>
            <div className="filters"></div>
        </div>

        <div className="admin_card">
            <div className="trending card_box_round" style={{padding: 18}}>
                <div className="centerbox">
                    <List
                        className="train_trends_list"
                        size="small"
                        loading={false}
                        itemLayout="horizontal"
                        dataSource={["", ...data.data]}
                        renderItem={ (item, index) => (
                            <List.Item>
                                {index == 0 ? <>
                                    <div className="train_form">
                                        <label>Add Train Text</label>
                                        <Search
                                            loading={loading}
                                            style={{ width: 500 }}
                                            placeholder=". . ."
                                            enterButton="Update"
                                            size="large"
                                            value={search}
                                            onChange={(e) => setsearch(e.target.value) }
                                            onSearch={(e) => onUpdate(e)}
                                        />
                                    </div>
                                </> : <>
                                    <p className="train_des">{item}</p>
                                    <div className="train_trends_list_action">
                                        <Space>
                                            {/* <a key="list-loadmore-edit"><EditOutlined /> edit</a> */}
                                                <a key="list-loadmore-more" onClick={() => deleteTrain(index-1)}><DeleteOutlined /> delete</a>
                                        </Space>
                                    </div>
                                </>}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>

    </>
})
export default TrainIntents;
