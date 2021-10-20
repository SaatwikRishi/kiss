import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Carousel } from 'antd';

import banner1 from "../../assets/images/banner1.jpg";

const PortalBanner = (props) => {

    return <>
        <div className="center_layout whitebg">
            <Carousel autoplay dotPosition="bottom">
                {[1,2,3,4,5,6,7,8,9].map((rec)=>
                  <div key={rec}><img src={banner1} /></div>
                )}
              
             
            </Carousel>
        </div>
    </>
}
export default PortalBanner;