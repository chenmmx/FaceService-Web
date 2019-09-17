import React, { Component } from 'react';
import { Button, Icon, Table } from 'antd';
import MyNotice from './notice';
import MyTitle from './title';
import './index.less';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
  }

  componentDidMount() {
    const data = [
      {
        id: 1,
        name: '111',
        address: 'http://11.1.1.1'
      },
      {
        id: 2,
        name: '222',
        address: 'http://2.2.2.2'
      }
    ];
    this.setState({
      data
    });
  }

  render() {
    const columns = [
      {
        title: '回调名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '回调地址',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate'
      }
    ];
    return (
      <div className="callback">
        <MyNotice message="温馨提示：注册照片接口新增照片质量检测功能，您可在人员管理模块添加照片进行体验。" />
        <MyTitle title="回调管理" />
        <div className="btn">
          <Button type="primary" ghost>添加回调</Button>
          <Icon type="info-circle" />
          <span>查看回调说明</span>
        </div>
        <Table pagination columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}

export default Callback;
