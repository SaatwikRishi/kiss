import React from "react";
import ReactDOM from "react-dom";
import { Router } from '@reach/router'
import loading from './src/assets/images/loading.gif'
import logo from './src/assets/images/favicon.png'
import 'antd/dist/antd.less';
import './src/assets/css/main.less';
import { Spin } from 'antd';
const KISS = React.lazy(() => import('./src/index'))
import { initializeApp } from '@firebase/app';
import Axios from "axios";

/*const firebaseConfig = {
    apiKey: "AIzaSyBE8Q0A9fqdta_xeZC1Y00J5qI9A21Cj04",
    authDomain: "hands2gether-c49c0.firebaseapp.com",
    projectId: "hands2gether-c49c0",
    storageBucket: "hands2gether-c49c0.appspot.com",
    messagingSenderId: "911777939876",
    appId: "1:911777939876:web:a18c3fc5f35daca6cd4131",
    measurementId: "G-B67SLGS719"
}*/

const firebaseConfig = {
  apiKey: "AIzaSyC51y7qWZNZwh7c54ZA7xnESJosGeTZdi8",
  authDomain: "kiss-ktop.firebaseapp.com",
  projectId: "kiss-ktop",
  storageBucket: "kiss-ktop.appspot.com",
  messagingSenderId: "885398931078",
  appId: "1:885398931078:web:23bc1435454053740bf307"
};

// ADDED BY SAATWIK

Axios.defaults.baseURL = "http://localhost:8080";

initializeApp(firebaseConfig)



ReactDOM.render(
    <React.Suspense fallback={
        
        // <div className="loading_wrapper">
        //     <div className="custom_loader">
        //         <img src={logo} />
        //         <div className="custom_loading">
        //             <Spin size="large" />
        //         </div>
        //     </div>
        // </div>
        
        // <div style={{ margin: '200px 100px', textAlign: 'center' }}> 
        //    <img src={loading} style={{ width: 800, height: 600, border: 'solid 2px #ccc', borderRadius: 10 }} /> 
        // </div>
	<div></div>
    }>
        <Router basepath="/">
            <KISS path="/*" />
        </Router>
    </React.Suspense>,
    document.getElementById("root")
);

