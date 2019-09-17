import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import BasicLayout from './components/layout';
import Login from './pages/login';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    this.setState({
      isLogin: true
    });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        {
              isLogin ? <BasicLayout /> : <Login />
          }
      </ConfigProvider>
    );
  }
}

export default App;
