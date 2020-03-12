import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
class FsMenu extends Component {
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
        <SubMenu
          key="sub3"
          title={(
            <span>
              <Icon type="control" />
              <span>边缘资源</span>
            </span>
        )}
        >
          <Menu.Item key="/resource/device">
            <Link to="/resource/device">
              <span>设备管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/resource/node">
            <Link to="/resource/node">
              <span>边缘节点</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/account">
          <Link to="/account">
            <Icon type="file-search" />
            <span>账号管理</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(FsMenu);
