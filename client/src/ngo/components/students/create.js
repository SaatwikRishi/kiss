import React, { useState, useEffect, useRef, memo } from 'react'
import { Row, Col, Input, Tabs, Select, Popover, Form, Button, Divider, DatePicker, Space, notification, TimePicker, Modal } from 'antd';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
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
import { useDispatch, useSelector } from "react-redux";
export const helpNumberFormat = (x) =>  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;

/**
 * Custom Component
 */
import { getAllStdCategories } from "../../store/actions";

const CreateStdProfile = memo((props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const eventsStore = useSelector(state => state.stdcategory);

    /**
     * get Category list from Event store
     */
    useEffect(() => {
        if (!eventsStore){
            dispatch(getAllStdCategories());
        } else if (!eventsStore.loading){
            dispatch(getAllStdCategories());
        }
    },[])

    /**
     * getForm data  from Store
     */
    const getEventStoreData = () => {
        //console.log(eventsStore);
        let mainObj = eventsStore ? eventsStore: {}
        mainObj = mainObj ? mainObj : [];
        //console.log(mainObj);
        return {
            loading: true,
            list: [],
            ...mainObj
        }
    }
    let eventsData = getEventStoreData();
    //console.log(eventsData);

    
    /**
     * on form Finish
     */
    let formStore = { password: Math.random().toString(36).slice(2) };
    const [loading, setloading] = useState(false);
    const onFinish = async (e) =>{
        console.log(e);
        let formData = _(e).pickBy(val => val).value();
        setloading(true);
        await axios.post(`/events/api/saveStudentProfile`, { data: formData }).then(res => {
            console.log(res);
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
     * Form Arr
     */
    const [categoryList, setcategoryList] = useState([0]);

    /**
     * remove CategoryList
     */
    const removeCategoryList = (val) => categoryList.length >1 && setcategoryList(_(categoryList).filter(value => value != val).value() );

    return <>
        <div className="_apifilter_subheader">
            <div className="_details">
                <div className="_title"> <SafetyCertificateTwoTone twoToneColor="#52c41a" /> Create Student Profile </div>
                <div className="_subTitle">create student profile with dynamic fields</div>
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
                            ...formStore,
                        }
                    })(),
                }}>
                
                <div className="category_list">
                    <BasicFields {...{ form, fUpdateTrigger, eventsData }} />

                    <CategoryForm {...{ form, fUpdateTrigger, eventsData }}  />
                </div>

                <Divider style={{ margin: '20px 0' }} />
                <Space>
                    <Button loading={loading} disabled={loading} icon={<FileSearchOutlined />} size="large" type="primary" htmlType="submit"> Save Form </Button>
                </Space>
            </Form>
        </div>

    </>
})
export default CreateStdProfile;

/**
 * Sub form box
 */
const BasicFields = (props) =>{
    const { form, fUpdateTrigger, eventsData } = props;
    const dateFormat = 'YYYY-MM-DD';
    console.log(eventsData);
    
    return <>
        <div className="category_box_basic">
            <div className="category_item">
                <Form.Item hasFeedback={true} name={'firstname'} label="first name" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input size="middle" />
                </Form.Item>
            </div>

            <div className="category_item">
                <Form.Item hasFeedback={true} name={'lastname'} label="last name" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input size="middle" />
                </Form.Item>
            </div>

            <div className="category_item">
                <Form.Item hasFeedback={true} name={'email'} label="email address" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input size="middle" />
                </Form.Item>
            </div>

            <div className="category_item">
                <Form.Item hasFeedback={true} name={'password'} label="password" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input.Password size="middle" />
                </Form.Item>
            </div>

            <div className="category_item">
                <Form.Item hasFeedback={true} name={'regno'} label="registration number" rules={[{ required: true, message: 'Please fill!' }]}>
                    <Input size="middle" />
                </Form.Item>
            </div>

            <div className="category_item">
                <Form.Item hasFeedback={true} name={'phoneno'} label="phone number" rules={[{ required: false, message: 'Please fill!' }]}>
                    <Input size="middle" />
                </Form.Item>
            </div>

        </div>
    </>
}

/**
 * Catgory Form
 */
const CategoryForm = (props) =>{
    const { form, fUpdateTrigger, eventsData } = props;
    console.log(eventsData);
    
    let catgoryJson = eventsData.list || [];
    try {
        //catgoryJson = _(catgoryJson).filter(val => val.stdcatid == form.getFieldValue('stdcatid')).value();
        catgoryJson = catgoryJson.length ? catgoryJson[0]: {};
        catgoryJson = JSON.parse(catgoryJson.studentcat_json);
        catgoryJson = catgoryJson ? catgoryJson : [];
        console.log(catgoryJson);
    } catch (error) {
        catgoryJson = [];
    }
    

    const dateFormat = 'YYYY-MM-DD';
    return <>
        <Divider style={{ margin: '20px 0' }} />
        <div className="category_box_basic" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gridGap: 25 }}>

            {catgoryJson.map(val=>{
                let template = '';
                if (val.input_type == 'text'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Input size="middle" style={{ width: '100%' }}/>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'dropdown'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Select size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                {val.dropdown.map(val=> <Option value={val}>{val}</Option> )}
                            </Select>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'tags'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <Select mode="tags" size="middle" onChange={(e) => { }} style={{ width: '100%' }}>
                                {val.dropdown.map(val=> <Option value={val}>{val}</Option> )}
                            </Select>
                        </Form.Item>
                    </div>
                }
                if (val.input_type == 'datepicker'){
                    template = <div className="category_item">
                        <Form.Item hasFeedback={true} name={['student_json',0,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            <DatePicker size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isAfter(moment.now())} />
                        </Form.Item>
                    </div>
                }
                // if (val.input_type == 'upload'){
                //     template = <div className="category_item">
                //         <Form.Item hasFeedback={true} name={['student_json',val.name,val.name]} label={val.name} rules={[{ required: true, message: 'Please fill!' }]}>
                            
                //         </Form.Item>
                //     </div>
                // }
                return template;
            })}
        </div>
    </>
}
