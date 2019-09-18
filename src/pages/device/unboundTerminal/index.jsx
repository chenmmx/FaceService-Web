import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Table, Button, Pagination
} from 'antd';

const { Column } = Table;
class UnboundTerminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    // 页码改变
    onPageChange = (pageIndex, pageSize) => {
      console.log('pageIndex', pageIndex);
      console.log('pageSize', pageSize);
    };

    // 绑定
    handleAdd = (item) => {
      const data = JSON.stringify({
        id: item.id,
        ip: item.ip
      });
      const { history } = this.props;
      history.push(`/device/add/${data}`);
    }

    render() {
      const { unboundList } = this.props;
      return (
        <div className="unboundTerminal">
          <Table dataSource={unboundList} rowKey="id" pagination={false}>
            <Column title="设备名称" dataIndex="terminalName" key="terminalName" />
            <Column title="IP" dataIndex="ip" key="ip" />
            <Column title="获取时间" dataIndex="time" key="time" />
            <Column
              title="操作"
              key="action"
              render={(text, record) => (
                <span>
                  <Button type="primary" onClick={this.handleAdd.bind(this, record)}>绑定</Button>
                </span>
              )}
            />
          </Table>
          <div className="terminal-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
            <Pagination total={200} defaultCurrent={1} onChange={this.onPageChange} />
          </div>
        </div>
      );
    }
}

export default withRouter(UnboundTerminal);
