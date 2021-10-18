import React from "react";
import ReactDOM from "react-dom";
import { Router } from '@reach/router'
import loading from './src/assets/images/loading.gif'
import 'antd/dist/antd.less';
import './src/assets/css/main.less';
const Twitter = React.lazy(() => import('./src/index'))

ReactDOM.render(
    <React.Suspense fallback={<div style={{ margin: '200px 100px', textAlign: 'center' }}> <img src={loading} style={{ width: 800, height: 600, border: 'solid 2px #ccc', borderRadius: 10 }} /> </div>}>
        <Router basepath="/">
            <Twitter path="/*" />
        </Router>
    </React.Suspense>,
    document.getElementById("root")
);
