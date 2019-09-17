import React, { Component } from 'react';
import {
  Layout, Menu, Icon, ConfigProvider
} from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style.less';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import AppRouter from '../../router';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Header, Sider, Content } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Layout id="layout">
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/application">
                    <Icon type="appstore" />
                    <span>应用管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/callback">
                    <Icon type="experiment" />
                    <span>回调管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/device">
                    <Icon type="control" />
                    <span>设备管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/person">
                    <Icon type="user" />
                    <span>人员管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/record">
                    <Icon type="file-search" />
                    <span>识别记录管理</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content
                className="content"
                style={{
                  margin: '24px 16px',
                  background: '#fff',
                  minHeight: 857
                }}
              >
                {/* Container */}
                <AppRouter />
              </Content>
            </Layout>
          </Layout>
        </Router>
      </ConfigProvider>
    );
  }
}

export default BasicLayout;

// ReactDOM.render(<SiderDemo />, mountNode);
