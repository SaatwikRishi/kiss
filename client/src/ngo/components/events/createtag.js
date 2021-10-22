import React, { useState, useEffect, useRef, memo } from 'react'
import { Row, Col, Input, Tabs, Select, Popover, Form, Button, Divider, DatePicker, Space, notification, TimePicker, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, navigate } from '@reach/router';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
import {
    SafetyCertificateTwoTone, DeleteOutlined, PlusOutlined,
    FileSearchOutlined, AlertOutlined, ContainerOutlined, CreditCardOutlined,
    ArrowRightOutlined, LinkOutlined, UngroupOutlined, ShareAltOutlined,
    ApiOutlined, CalendarOutlined, RotateLeftOutlined,
} from '@ant-design/icons';

import _, { remove } from 'lodash'
import moment from 'moment-timezone';
moment.tz.setDefault('America/Los_Angeles');
import axios from 'axios';
export const helpNumberFormat = (x) =>  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;


const CreateTag = memo((props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    
    let formStore = {};  
    /**
     * Form Arr
     */
    const [tagList, settagList] = useState([0]);
    let initialState = {
        tag: ''
    }
    const [Inistate, setIniState] = useState(initialState)
    const [loading, setloading] = useState(false);
    /**
     * on form Finish
     */
    const onFinish = async (e) =>{
        console.log(e);
        let formData = {
            tag: e.tag
        };        
        setloading(true);
        await axios.post(`/events/api/saveTag`, { data: formData }).then(res => {
            dispatch(getTagsResult());
            navigate("/admin/events/listtags")
        }).finally(() => {
            setloading(false);
        })
    }

    /**
     * form Update for all change
     */
    const [fValue, setfValue] = useState(1);
    const fUpdateTrigger = () => { setfValue(fValue + 1) }

    /**
     * remove CategoryList
     */
    const removeCategoryList = (val) => tagList.length >1 && settagList(_(tagList).filter(value => value != val).value() );

    console.log(tagList);

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Create Tags </div>
                <div className="_subTitle">create tag </div>
            </div>
            <div className="filters"></div>
        </div>
        <Divider style={{ margin: '20px 0' }} />


        <div className="category_creation" style={{ minHeight: '80vh'}}>
            <Form className="initial_form" layout="vertical"
                form={form}
                onFinish={(e) => onFinish(e)}
                initialValues={{
                    ...(() => {
                        return {
                            ...Inistate,
                        }
                    })(),
                }}>
                
                <div className="category_list">
                    <div className="category_dynamic_fields_header">
                        <div className="category_dynamic_button">
                            <Button icon={<PlusOutlined />} size="large" type="dashed" className="add_dynamicFields_button"
                                onClick={() => {
                                    let next = tagList.length ? tagList[tagList.length - 1] + 1 : 1;
                                    settagList([...tagList, next])
                                }}> Add </Button>
                        </div>
                    </div>

                    {tagList.map((formIndex, key) => <>
                        <div className="category_box_wrapper">
                            <div className="category_menu">
                                <div className="category_count"><span>{key + 1}</span></div>
                                {key != 0 && <div className="category_remove" onClick={() => { removeCategoryList(formIndex)}}><DeleteOutlined /></div>}
                            </div>
                            <DynamicFields {...{ form, formIndex, fUpdateTrigger }} />
                        </div>
                    </>)}
                </div>

                <Divider style={{ margin: '20px 0' }} />
                <Space>
                    <Button loading={loading} disabled={loading} icon={<FileSearchOutlined />} size="large" type="primary" htmlType="submit"> Save Form </Button>
                </Space>
            </Form>
        </div>

    </>
})
export default CreateTag;

/**
 * Sub form box
 */
const DynamicFields = (props) =>{
    const { form, formIndex, fUpdateTrigger } = props;
    console.log(formIndex);

    return <>
        <div className="category_box">
            <div className="category_item">
                <Form.Item  hasFeedback={true} name= {['tag', formIndex ,'name']} label="name" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input size="middle" onChange={(e) => { fUpdateTrigger() }} />
                </Form.Item>
            </div>
        </div>
    </>
}
