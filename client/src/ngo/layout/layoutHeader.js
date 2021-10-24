import React from 'react'
import { useSelector } from "react-redux";
import { Layout, Avatar} from 'antd';
import logo from "../../assets/images/favicon.png";
const LayoutHeader = (props) => {
    const { Header } = Layout;
    const user = useSelector(state => state.user);
    return <>
        <Header className="layout_header">
            <div className="grid_two">
                <div className="_left">
                    <div className="_logo">
                        <img src={logo} /> 
                    </div>
                   
                </div>
                <div className="_right">
                    <Avatar.Group size="large">                       
                        <Avatar size="large" src={`https://bridgeimages.paypalcorp.com/images/120120/${user.qid}.jpg?q=1608221763557`}><span>{user.name}</span></Avatar>
                        <div className="userinfo">
                            <span className="username">{user.name}</span>
                            <span className="userdepartment">{user.department}</span>
                        </div>                
                    </Avatar.Group>
                </div>
            </div>
        </Header>
    </>
}
export default LayoutHeader;

