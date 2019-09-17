import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { isLogin } = this.props;
    console.log(isLogin);
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

App.propTypes = {
  isLogin: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  const { common } = state;
  return {
    isLogin: common.isLogin
  };
};

export default connect(mapStateToProps, null)(App);
