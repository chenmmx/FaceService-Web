import React from 'react';
import { Table } from 'antd';

export default class failedTable extends React.Component {
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
          title: '设备序列号',
          dataIndex: 'guid',
          key: 'guid'
        },
        {
          title: '设备名称',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '识别模式',
          dataIndex: 'address',
          key: '2'
        },
        {
          title: '识别时间',
          dataIndex: 'address',
          key: '3'
        },
        {
          title: '人脸抓拍',
          dataIndex: 'address',
          key: '4'
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
