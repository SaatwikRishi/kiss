import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from '@reach/router';

import _ from 'lodash';
import { Menu, Layout, Tooltip } from 'antd';
const { Sider } = Layout;
import {
    DashboardOutlined, MenuFoldOutlined, TwitterOutlined,
    MenuUnfoldOutlined, CalendarOutlined, TagsOutlined
} from '@ant-design/icons';

const LayoutSideBar = (props) => {

    const [state, setstate] = useState({ collapsed: false, selectedKeys: props.location.pathname })
    const onCollapse = (collapsed) => setstate({ ...state, collapsed: collapsed })
    const onChangeCollapse = () => setstate({ ...state, collapsed: !state.collapsed });

    return <>
        <div className="layout_sideBar">
            <Sider collapsible collapsed={state.collapsed} onCollapse={(collapsed) => onCollapse(collapsed)} >
                {!state.collapsed ? <>
                    <div className="appName">
                        <div>
                            <div className="sidebar_left_header">
                                <Tooltip title="Collapse Menu" placement="rightBottom">
                                    <div className="pin_point" onClick={() => onChangeCollapse()}><MenuFoldOutlined /></div>
                                </Tooltip>
                                <div className="_title">Complains</div>
                            </div>
                        </div>
                    </div>
                </> : <>
                    <Tooltip title="Expand Menu" placement="right">
                        <div className="collapsed_menu" onClick={() => onChangeCollapse()}>
                            <MenuUnfoldOutlined />
                        </div>
                    </Tooltip>
                </>}
                <Menu id="ramesh" mode="inline" selectedKeys={state.selectedKeys} onSelect={(e) => setstate({ ...state, selectedKeys: e.key })} >
                    <Menu.Item key='/' icon={<DashboardOutlined />}>
                        <Link to='/'>Dashboard</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    </>
}
export default LayoutSideBar;