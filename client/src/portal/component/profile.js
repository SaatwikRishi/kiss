
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { Breadcrumb, Card, Layout, Spin, Row, Col, Divider, Button, Input, Tabs, Select, Popover, Form, DatePicker, Space, notification, TimePicker, Modal, message } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
import { getTagsResult, getAllStdCategories } from '../../ngo/store/actions';
import axios from 'axios';

const ProfilePage = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const student = useSelector(state => state.user); 
    const eventsStore = useSelector(state => state.stdcategory); 
    const tagsStore = useSelector(state => state.tags);

    if(student.status!='active') {
        navigate('/login');
    }
    /**
     * get Category list from Event store
     */
    useEffect(() => {
        if (!eventsStore){
            dispatch(getAllStdCategories());
        } else if (!eventsStore.loading){
            dispatch(getAllStdCategories());
        }
        if (!tagsStore){
            dispatch(getTagsResult());
        } else if (!tagsStore.loading){
            dispatch(getTagsResult());
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
    const getTagsStoreData = () => {
        //console.log(eventsStore);
        let mainObj = tagsStore ? tagsStore: {}
        mainObj = mainObj ? mainObj : [];
        //console.log(mainObj);
        return {
            loading: true,
            list: [],
            ...mainObj
        }
    }
    let tagsData = getTagsStoreData();
    
    let initialState = student
    const [loading, setloading] = useState(false);
    const [Inistate, setIniState] = useState(initialState)

    const onFinish = async (e) => {
        console.log(e);
        let formData = _(e).pickBy(val => val).value();
        setloading(true);
        await axios.post(`/events/api/saveStudentProfile`, { data: formData }).then(res => {
            if(res.data.result.error) {
                message.error(`Failed to update profile, please try again!`);
            } else {
                message.success(`profile added successfully!`);
            }
            navigate("/home")
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
     * based on id check edit mode or not
     * if setForm data
     */
    let eventEditObj = {};
    let formStore = {};
    useEffect(() => {
        eventEditObj = student;
        eventEditObj = _(eventEditObj).pickBy(val => val).value();
 
        let formInit = {
            ...eventEditObj,
            ...(() => {
                if (eventEditObj.student_json) {
                    try {
                        let studentcat_json = JSON.parse(eventEditObj.student_json);
                        studentcat_json = studentcat_json && studentcat_json.length ? studentcat_json : null;
                        
                        if (studentcat_json) {
                            return { studentcat_json: studentcat_json }
                        }
                    } catch (error) { }
                }
            })(),            
            ...(() => {
                if (eventEditObj.dob) {
                    return { dob: moment(eventEditObj.dob) }
                }
            })(),
            ...(() => {
               if (eventEditObj.tags) {
                  try {
                      let tags = eventEditObj.tags.split(',');
                      tags = tags && tags.length ? tags : [];
                      if (tags) {
                          return { tags: tags }
                      }
                  } catch (error) { }
              }
           })(),
        };
        formInit.studentcat_json && formInit.studentcat_json.length && setcategoryList(Array.from({ length: formInit.studentcat_json.length }, (val, key) => key));
        console.log(formInit);
        form.setFieldsValue(formInit);
    }, [student])

    const dateFormat = 'YYYY-MM-DD';
    const tagslist = tagsData.list;
    const children = [];
    for (let i = 0; i < tagslist.length; i++) {
        children.push(<Option key={tagslist[i].tag}>{tagslist[i].tag}</Option>);
    }

    const removeCategoryList = (val) => categoryList.length >1 && setcategoryList(_(categoryList).filter(value => value != val).value() );
 

    return <>
        <Content>
            <section style={{ marginTop: 50, padding: '10px 20px' }}>
                <div className="category_creation" style={{ minHeight: '80vh' }}>
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
                        <div className="category_box_basic">
                            <div className="category_item">
                                <Form.Item name={'studentid'} hidden={true}>
                                    <Input type="text" />
                                </Form.Item>

                                <Form.Item hasFeedback={true} name={'firstname'} label="First name" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Input size="middle" />
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'lastname'} label="Last name" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Input size="middle" />
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'email'} label="Email address" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Input size="middle" />
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'dob'} label="Date of Birth" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <DatePicker size="middle" style={{ width: '100%' }} disabledDate={date => moment(date).isAfter(moment.now())} />
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'regno'} label="Registration number" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Input size="middle" />
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'phoneno'} label="Phone number" rules={[{ required: false, message: 'Please fill!' }]}>
                                    <Input size="middle" />
                                </Form.Item>
                            </div>

                            <div className="category_item">
                                <Form.Item hasFeedback={true} name={'tags'} label="Skills/Interests" rules={[{ required: true, message: 'Please fill!' }]}>
                                    <Select mode="tags" style={{ width: '100%' }} placeholder="skills/interests">
                                        {children}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <section>
                            {student.student_json ?
                            <CategoryForm {...{ form, fUpdateTrigger, eventsData }}  />:''
                            }                            
                        </section>
                        <Divider style={{ margin: '20px 0' }} />
                        <Space>
                            <Button loading={loading} disabled={loading} icon={<FileSearchOutlined />} size="large" type="primary" htmlType="submit"> Update Profile </Button>
                        </Space>
                    </Form>
                </div>
            </section>

        </Content>

    </>
}

const CategoryForm = (props) =>{
    const { form, fUpdateTrigger, eventsData } = props;
    
    let catgoryJson = eventsData.list || [];
    try {
        //catgoryJson = _(catgoryJson).filter(val => val.stdcatid == form.getFieldValue('stdcatid')).value();
        catgoryJson = catgoryJson.length ? catgoryJson[0]: {};
        catgoryJson = JSON.parse(catgoryJson.studentcat_json);
        catgoryJson = catgoryJson ? catgoryJson : [];
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


export default ProfilePage;