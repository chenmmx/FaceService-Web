import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import FsMenu from '../common/fs-menu';
import './style.less';
import AppRouter from '../../router';

const { Header, Sider, Content } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {
    console.log();
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  render() {
    return (
      <Layout id="layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <FsMenu />
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
              padding: 24,
              background: '#fff',
              minHeight: 857
            }}
          >
            {/* Container */}
            <AppRouter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;

// ReactDOM.render(<SiderDemo />, mountNode);
