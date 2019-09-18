import React, { Component } from 'react';
import { Table, Button, Divider } from 'antd';

const columns = [
  {
    title: '设备名称',
    dataIndex: 'terminalName',
    key: 'terminalName'
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip'
  },
  {
    title: '获取时间',
    key: 'time',
    dataIndex: 'time'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="primary">编辑 {record.name}</Button>
        <Divider type="vertical" />
        <Button>删除</Button>
      </span>
    )
  }
];

class UnboundTerminal extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { unboundList } = this.props;
    return (
      <div className="unboundTerminal">
        <Table columns={columns} dataSource={unboundList} rowKey="id" />
      </div>
    );
  }
}

export default UnboundTerminal;
