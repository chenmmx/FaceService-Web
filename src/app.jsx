import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import BasicLayout from './components/layout';
import Login from './pages/login';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route
              component={Login}
              exact
              path="/login"
            />
            <Route
              component={BasicLayout}
              path="/"
            />
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
}

export default App;
