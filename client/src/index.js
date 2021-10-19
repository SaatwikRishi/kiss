import React from 'react'
import { Router } from '@reach/router'
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from './ngo/store/reducer'
import { ErrorBoundary } from 'react-error-boundary'
import { Layout, Breadcrumb } from 'antd';

import moment from "moment-timezone"
moment.tz.setDefault('America/Los_Angeles')
window["moment"]=moment
const { Header, Content, Footer, } = Layout;

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;
const store = createStore(reducers, compose(applyMiddleware(promise), composeEnhancers))
const NGO = React.lazy(() => import('./ngo/index'))


const LayoutScreen = (props) => {

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
      <Provider store={store}>
        <Router>
          <NGO path="/*" />
        </Router>
      </Provider>
    </ErrorBoundary>
  )

}
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>NGO APP</Breadcrumb.Item>
            <Breadcrumb.Item>FATAL error</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div role="alert">
              <pre>{error.message}</pre>
              <pre>{JSON.stringify(error, null, 4)}</pre>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default LayoutScreen

