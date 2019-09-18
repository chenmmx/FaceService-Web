import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Table, Button, Divider, Pagination
} from 'antd';

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
        <Button type="primary">绑定 {record.name}</Button>
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

  // 页码改变
onPageChange = (pageIndex, pageSize) => {
  console.log('pageIndex', pageIndex);
  console.log('pageSize', pageSize);
};

render() {
  const { unboundList } = this.props;
  return (
    <div className="unboundTerminal">
      <Table columns={columns} dataSource={unboundList} rowKey="id" pagination={false} />
      <div className="terminal-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
        <Pagination total={200} defaultCurrent={1} onChange={this.onPageChange} />
      </div>
    </div>
  );
}
}

export default withRouter(UnboundTerminal);
