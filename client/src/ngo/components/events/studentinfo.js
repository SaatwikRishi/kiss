
import React, { useEffect, memo, useState, useRef }  from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import { Row, Col, Table, Button, Form, Input, Layout, Modal, Space, Divider,Dropdown, Select, Typography, notification, Drawer} from 'antd';
import { TeamOutlined } from '@ant-design/icons'
import { Link, navigate } from '@reach/router';
import moment from 'moment-timezone'
import _ from 'lodash'

const { Option, OptGroup } = Select;
const { Column } = Table
const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const StudentInfo = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { record, studentsList, formsData } = props.data;
    let forms = formsData.list ? formsData.list : [];

    const [openDrawer, setopenDrawer] = useState(false);
    
    let stdObj = _(forms).filter(val => val.eventid == record.eventid ).value();
    var regstudents = [];
    if(stdObj.length>0)
    {
        let groupedstd = Object.keys(_.groupBy(stdObj, 'studentid'));
        let studentemailfilter = _(studentsList.list).filter(val => groupedstd.indexOf((val.studentid).toString())>-1 ).value();          
        studentemailfilter.forEach(val => { 
            regstudents.push(val.firstname+' '+val.lastname+' <'+val.email+'>');
        });
    }
    return <>
            <Typography.Link title="Students" style={{ padding: "0px 5px" }}><TeamOutlined onClick={() => setopenDrawer(!openDrawer)}/></Typography.Link>
            <Drawer
                title={'Students regitered for this event'}
                width={500}
                visible={openDrawer}
                onClose={() => { setopenDrawer(false) }}
                closable={true}
                placement={'left'}
            >
                {regstudents.map(function(item){
                    return <><p>{item}</p></>
                })}
            </Drawer>  
        </>
};

export default StudentInfo;