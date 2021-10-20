import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';

import { Breadcrumb, Layout, Spin } from 'antd';
const { Content } = Layout;
import { ReconciliationOutlined, FormOutlined } from '@ant-design/icons';
import { updateUser } from '../../ngo/store/actions';


const Index = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    /** 
     * Scroll Top on Each Routing
     * user Tracking  . . .
     */
    useEffect(() => {
        setTimeout(() => { document.body.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    }, [location.pathname])

    const [loading, setloading] = useState(false);
    useEffect(() => {
        dispatch(updateUser());
    }, []);

    return <>
        <Content>
            <section>
                <Breadcrumb>
                    <Breadcrumb.Item>KISS</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Studet Portal</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Dashboard</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </section>
        </Content>

    </>
}
export default Index;