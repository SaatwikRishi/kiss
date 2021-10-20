import React from "react";
import ReactDOM from "react-dom";
import { Router } from '@reach/router'
import loading from './src/assets/images/loading.gif'
import 'antd/dist/antd.less';
import './src/assets/css/main.less';
const NGO = React.lazy(() => import('./src/index'))
import { initializeApp } from '@firebase/app';
const firebaseConfig = { "apiKey": "AIzaSyDkS8NyQjohdwDH5PqWuVVYQfzDCwK3MnE", "authDomain": "raspberrypi-a43ed.firebaseapp.com", "projectId": "raspberrypi-a43ed", "storageBucket": "raspberrypi-a43ed.appspot.com", "messagingSenderId": "335172368391", "appId": "1:335172368391:web:fcc97e92c2957b415c92a2" }
initializeApp(firebaseConfig)
ReactDOM.render(
    <React.Suspense fallback={<div style={{ margin: '200px 100px', textAlign: 'center' }}> <img src={loading} style={{ width: 800, height: 600, border: 'solid 2px #ccc', borderRadius: 10 }} /> </div>}>
        <Router basepath="/">
            <NGO path="/*" />
        </Router>
    </React.Suspense>,
    document.getElementById("root")
);
