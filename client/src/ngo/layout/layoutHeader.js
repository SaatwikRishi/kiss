import React, {useState} from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Layout, Avatar} from 'antd';
import logo from "../../assets/images/favicon.png";
import {  Menu, Row, Col, Dropdown } from 'antd';
import axios from 'axios';

/**
 * Actions
 */
import { updateUser } from '../../ngo/store/actions';
import { navigate } from '@reach/router';
const LayoutHeader = (props) => {
    const dispatch = useDispatch();
    const { Header } = Layout;
    const user = useSelector(state => state.user);

    const [state, setState] = useState()
    const handleClick = e => {
        setState(e.key);
    };

    const logout = () => {
        axios.get(`/api/logout`).then(res => {
            dispatch(updateUser(null));
            navigate("/login")
        });
    }

    const { SubMenu } = Menu;
    return <>
        <Header className="layout_header">
            <div className="grid_two">
                <div className="_left">
                    <div className="_logo">
                        <img onClick={(e) =>{ navigate('/home')}} src={logo} /> 
                    </div>
                   
                </div>
                <div className="_right">
                    <Menu onClick={(e) => handleClick(e)} selectedKeys={state} mode="horizontal">
                        <SubMenu key="SubMenu" title=
                            {<Avatar.Group >
                            <Avatar style={{ marginTop: 10 }} src={`https://bridgeimages.paypalcorp.com/images/120120/${user.qid}.jpg?q=1608221763557`}><span>{user.name && user.name}</span></Avatar>
                                <div className="userinfo"><span className="username">
                                {user.firstname && user.firstname} {user.lastname && user.lastname}
                                </span></div>
                            </Avatar.Group>}>
                            {user.email ?
                                <>
                                    <Menu.Item key="setting:2" onClick={() => logout()}>Logout</Menu.Item>
                                </> :
                                <Menu.Item key="setting:1" onClick={() => navigate('/login')}>Login</Menu.Item>
                            }
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        </Header>
    </>
}
export default LayoutHeader;

