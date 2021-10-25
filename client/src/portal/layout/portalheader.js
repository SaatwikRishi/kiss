import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, navigate } from '@reach/router';
import { Layout, Avatar, Menu, Row, Col, Dropdown } from 'antd';
import {
    AppstoreOutlined, HomeOutlined, SettingOutlined, UserOutlined, LogoutOutlined, LikeOutlined, FileDoneOutlined,
    AppstoreAddOutlined, MenuOutlined, ContainerOutlined } from '@ant-design/icons';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import axios from 'axios';

const { Header } = Layout;
import logo from "../../assets/images/favicon.png";
import { updateUser } from '../../ngo/store/actions';
export const helpNumberFormat = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

const PortalHeader = (props) => {
    const user = useSelector(state => state.user);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    //console.log({ auth, provider })

    const [state, setState] = useState()
    const handleClick = e => {
        setState(e.key);
    };
    const { SubMenu } = Menu;

    const logout = () =>{
        axios.get(`/api/logout`).then(res => {
            dispatch(updateUser());
            navigate("/login")
        });
    }

    const menu = (
        <Menu className="userMenu">
            <Menu.Item icon={<HomeOutlined />} key="mail" onClick={() => navigate('/home')} >
                <a rel="noopener noreferrer" >Home</a>
            </Menu.Item>
            <Menu.Item icon={<ContainerOutlined />} key="alipay" onClick={() => navigate('/event')}>
                <a rel="noopener noreferrer" >Calender View</a>
            </Menu.Item>
            <Menu.Item icon={<FileDoneOutlined />} key="MyEvents" onClick={() => navigate('/myEvents')}>
                <a rel="noopener noreferrer" >My Events</a>
            </Menu.Item>
            <Menu.Divider />
            {user.email ?
                <>
                    <Menu.Item key="setting:0" style={{minWidth: '150px'}}>
                        <Avatar.Group >
                            <Avatar style={{ marginTop: 10 }} src={`https://bridgeimages.paypalcorp.com/images/120120/${user.qid}.jpg?q=1608221763557`}><span>{user.name}</span></Avatar>
                            <div className="userinfo"><span className="username">{user.firstname} {user.lastname} </span></div>
                        </Avatar.Group>
                    </Menu.Item>
                    <Menu.Item icon={<UserOutlined />} key="setting:1" onClick={() => navigate((user.status == 'active') ? '/profile' : '/login')}>Profile</Menu.Item>
                    <Menu.Item icon={<LogoutOutlined />} key="setting:2" onClick={() => logout()}>Logout</Menu.Item>
                </> :
                <Menu.Item key="setting:1" onClick={() => navigate('/login')}>Login</Menu.Item>
            }
        </Menu>
    );
    return <>
        <div className="header_cont" style={{ background: '#fff' }}>
            <div className="main-content">

                <div className="header_bar">
                    <div className="layout_left">
                        <div className="logo">
                            <img src={logo} onClick={() => { navigate('/home') }} style={{cursor: 'pointer'}} />
                        </div>
                        <div className="menu">
                            <Menu onClick={(e) => handleClick(e)} selectedKeys={state} mode="horizontal">
                                <Menu.Item key="MyEvents" onClick={() => navigate('/myEvents')}>
                                    <a rel="noopener noreferrer" >My Events</a>
                                </Menu.Item>
                                <Menu.Item key="alipay" onClick={() => navigate('/event')}>
                                    <a rel="noopener noreferrer" >Calender View</a>
                                </Menu.Item>
                                <Menu.Item key="mail" onClick={() => navigate('/home')} >
                                    <a rel="noopener noreferrer" >Home </a>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                    <div className="layout_right">
                       {windowSize > 900 && <div className="user_menu">
                            <Menu onClick={(e) => handleClick(e)} selectedKeys={state} mode="horizontal">
                                <SubMenu key="SubMenu" title=
                                    {<Avatar.Group >
                                        <Avatar style={{ marginTop: 10 }} src={`https://bridgeimages.paypalcorp.com/images/120120/${user.qid}.jpg?q=1608221763557`}><span>{user.name}</span></Avatar>
                                        <div className="userinfo"><span className="username">
                                            {user.firstname} {user.lastname} 
                                        </span></div>
                                    </Avatar.Group>}>
                                    {user.email ?
                                        <>
                                            <Menu.Item key="setting:1" onClick={() => navigate((user.status == 'active') ? '/profile' : '/login')}>Profile</Menu.Item>
                                            <Menu.Item key="setting:2" onClick={() => logout()}>Logout</Menu.Item>
                                        </> :
                                        <Menu.Item key="setting:1" onClick={() => navigate('/login')}>Login</Menu.Item>
                                    }
                                </SubMenu>
                            </Menu>
                        </div>}
                        <div className="mobile_menu">
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                                <MenuOutlined />
                            </Dropdown>
                        </div>
                        
                    </div>
                </div>



            </div>
        </div>
        <div className="banner_placeholder">
            <div className="main-content">
                <div className="banner_subheader_statisti">
                    <div className="banner_subheader_box" style={{ background: 'rgb(62 167 66)', opacity: 0.8, color: '#fff'}}>
                        <div className="icon"><UserOutlined /> <span className="ti">Students</span> </div>
                        <div className="text">{helpNumberFormat(4000)} </div>
                    </div>
                    <div className="banner_subheader_box" style={{ background: '#005993', opacity: 0.8, color: '#fff'}}>
                        <div className="icon"><ContainerOutlined /> <span className="ti">Events</span> </div>
                        <div className="text">{helpNumberFormat(75)} </div>
                    </div>
                    <div className="banner_subheader_box" style={{ background: '#ff9800', opacity: 0.8, color: '#fff'}}>
                        <div className="icon"><LikeOutlined /> <span className="ti">Jobs</span> </div>
                        <div className="text">{helpNumberFormat(50)} </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}
export default PortalHeader;

function useWindowSize() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

