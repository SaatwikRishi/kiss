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
                <Breadcrumb className="bredcrum_style1">
                    <Breadcrumb.Item>KISS</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Studet Portal</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Dashboard</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </section>
            <section style={{marginTop:20}}>
                <Row gutter={[16,16]}>
                    <Col span={16}>
                        <div className="category_card">
                            <div className="category_box">
                                <div className="category_title"> health Care </div>
                                <div className="category_des"> Hendrerit assumenda nec modi exercitation iusto mollis hymenaeos per cupiditate cum ipsum? Repellat orci enim, hendrerit!  </div>
                                <div className="category_events">Events: <span className="count">22</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> police officer </div>
                                <div className="category_des"> diam, doloremque vero sociosqu, urna, ipsam maxime nostrum eget, nostrum occaecat nisl sollicitudin eum est ultrices  </div>
                                <div className="category_events">Events: <span className="count">345</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> engineering </div>
                                <div className="category_des"> Non ac sociis. Imperdiet laudantium nullam sem sunt lectus et! Irure? Auctor! Proident maecenas tristique elementum, itaque pariatur  </div>
                                <div className="category_events">Events: <span className="count">100</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> social media </div>
                                <div className="category_des"> tortor iaculis nascetur, ad pellentesque varius facere aliquet metus? Nesciunt mus, vitae, aliquip! Dicta proin? Dui platea fugiat  </div>
                                <div className="category_events">Events: <span className="count">352</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> health Care </div>
                                <div className="category_des"> Hendrerit assumenda nec modi exercitation iusto mollis hymenaeos per cupiditate cum ipsum? Repellat orci enim, hendrerit!  </div>
                                <div className="category_events">Events: <span className="count">85</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> it department </div>
                                <div className="category_des"> Sollicitudin ante nisl amet iaculis ultrices proin mollitia facere irure, recusandae inceptos, ullam curabitur aliquet nunc!  </div>
                                <div className="category_events">Events: <span className="count">13</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> social media </div>
                                <div className="category_des"> Hendrerit assumenda nec modi exercitation iusto mollis hymenaeos per cupiditate cum ipsum? Repellat orci enim, hendrerit!  </div>
                                <div className="category_events">Events: <span className="count">345</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> health Care </div>
                                <div className="category_des"> diam, doloremque vero sociosqu, urna, ipsam maxime nostrum eget, nostrum occaecat nisl sollicitudin eum est ultrices  </div>
                                <div className="category_events">Events: <span className="count">865</span></div>
                            </div>
                            <div className="category_box">
                                <div className="category_title"> medicine </div>
                                <div className="category_des"> Non ac sociis. Imperdiet laudantium nullam sem sunt lectus et! Irure? Auctor! Proident maecenas tristique elementum, itaque pariatur  </div>
                                <div className="category_events">Events: <span className="count">446</span></div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Calendar className="calender_box"  fullscreen={false} />
                    </Col>
                </Row>
            </section>
        </Content>

    </>
}
export default Index;