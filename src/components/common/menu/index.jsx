import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const path = this.props.location.pathname;
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
        <Menu.Item key="/application">
          <Link to="/application">
            <Icon type="appstore" />
            <span>应用管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/callback">
          <Link to="/callback">
            <Icon type="experiment" />
            <span>回调管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/device">
          <Link to="/device">
            <Icon type="control" />
            <span>设备管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/person">
          <Link to="/person">
            <Icon type="user" />
            <span>人员管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/record">
          <Link to="/record">
            <Icon type="file-search" />
            <span>识别记录管理</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(LeftMenu);
