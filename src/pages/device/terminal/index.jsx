import React, { Component } from 'react';
import {
  Table, Button, Divider, Pagination
} from 'antd';
import { withRouter } from 'react-router-dom';

const columns = [
  {
    title: '设备名称',
    dataIndex: 'terminalName',
    key: 'terminalName'
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title: '保修期',
    dataIndex: 'warranty',
    key: 'warranty'
  },
  {
    title: 'IP',
    key: 'ip',
    dataIndex: 'ip'
  },
  {
    title: '版本号',
    key: 'version',
    dataIndex: 'version'
  },
  {
    title: '识别阈值',
    key: 'recongnizeThreshould',
    dataIndex: 'recongnizeThreshould'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="primary">编辑 {record.terminalName}</Button>
        <Divider type="vertical" />
        <Button>删除</Button>
      </span>
    )
  }
];

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  // 页码改变
onPageChange = (pageIndex, pageSize) => {
  console.log('pageIndex', pageIndex);
  console.log('pageSize', pageSize);
};

render() {
  const { bindList } = this.props;
  return (
    <div className="terminal">
      <Table columns={columns} dataSource={bindList} rowKey="id" pagination={false} />
      <div className="terminal-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
        <Pagination total={200} defaultCurrent={1} onChange={this.onPageChange} />
      </div>
    </div>
  );
}
}

export default withRouter(Terminal);
