import React, { useState } from 'react';
import {
  Layout, Icon, Dropdown, Menu
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FsMenu from '../common/fs-menu';
import './style.less';
import { logout } from '../../store/actions/common';
import AppRouter from '../../router';

const { Header, Sider, Content } = Layout;

function BasicLayout(props) {
  console.log('props------', props);
  const [collapsed, setCollapsed] = useState(false);

  const { handleLogout, isLogin, history } = props;

  if (!isLogin) {
    history.push('/login');
  }

  return (
    <Layout id="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <FsMenu />
      </Sider>
      <Layout>
        <Header style={{
          background: '#fff', padding: '0 30px 0 0', display: 'flex', justifyContent: 'space-between '
        }}
        >
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => {
              setCollapsed(!collapsed);
              console.log(collapsed);
            }}
          />
          <Dropdown overlay={(
            <Menu>
              <Menu.Item>
                <a rel="noopener noreferrer" href="/#/login" onClick={() => { handleLogout(); }}>
                  退出登录
                </a>
              </Menu.Item>
            </Menu>
)}
          >
            <span className="dropdown-link">
              用户 <Icon type="down" />
            </span>
          </Dropdown>
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

const mapStateToProps = (state) => {
  const { common } = state;
  return {
    isLogin: common.isLogin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  console.log(props);
  return {
    handleLogout() {
      const action = logout();
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicLayout));
