import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Router, Link, navigate, useLocation } from '@reach/router';
import _ from 'lodash';

import { Breadcrumb, Card, Layout, Spin, Row, Col, Calendar, Divider } from 'antd';
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
            <Divider />
            <section style={{marginTop:20}}>
                <Row gutter={[16,16]}>
                    <Col span={16}>
                        <Card>
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                            <Card.Grid width={25}>
                                <h2><ReconciliationOutlined /> Events</h2>
                            </Card.Grid>                            
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Calendar  fullscreen={false} />
                    </Col>
                </Row>
            </section>
        </Content>

    </>
}
export default Index;