import React from 'react';
import { Table } from 'antd';

export default class successTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'guid',
          dataIndex: 'guid',
          key: 'guid'
        },
        {
          title: '应用名称',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '设备序列号',
          dataIndex: 'address',
          key: '2'
        },
        {
          title: '设备名称',
          dataIndex: 'address',
          key: '3'
        },
        {
          title: '识别模式',
          dataIndex: 'address',
          key: '4'
        },
        {
          title: '识别时间',
          dataIndex: 'address',
          key: '5'
        },
        {
          title: '人脸抓拍',
          dataIndex: 'address',
          key: 'address'
        }
      ]
    };
  }

  render() {
    return (
      <Table dataSource={this.props.dataSource} columns={this.state.columns} />
    );
  }
}
