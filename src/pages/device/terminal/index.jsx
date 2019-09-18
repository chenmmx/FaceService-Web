import React, { Component } from 'react';
import {
  Table, Button, Divider, Pagination, Modal
} from 'antd';
import { withRouter } from 'react-router-dom';
import DeviceFormDelete from '../form/delete';

const { Column } = Table;
class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      visible: false
    };
  }

    // 编辑
    handleUpdate =(id) => {
      console.log(id);
      const { history } = this.props;
      history.push('/device/update');
    }

    // 删除
    handleDelete = (id) => {
      this.setState({
        visible: true,
        modalType: 'delete',
        modalTitle: '确认提示'
      });
      console.log(id);
    }

    // 弹框关闭
    handleClose = () => {
      this.setState({
        visible: false
      });
    }

    // 页码改变
    onPageChange = (pageIndex, pageSize) => {
      console.log('pageIndex', pageIndex);
      console.log('pageSize', pageSize);
    };

    render() {
      const { modalType, modalTitle, visible } = this.state;
      const { bindList } = this.props;
      return (
        <div className="terminal">
          <Table dataSource={bindList} rowKey="id" pagination={false}>
            <Column title="设备名称" dataIndex="terminalName" key="terminalName" />
            <Column title="状态" dataIndex="state" key="state" />
            <Column title="保修期" dataIndex="warranty" key="warranty" />
            <Column title="IP" dataIndex="ip" key="ip" />
            <Column title="版本号" dataIndex="version" key="version" />
            <Column title="识别阈值" dataIndex="recongnizeThreshould" key="recongnizeThreshould" />
            <Column
              title="操作"
              key="action"
              render={(text, record) => (
                <span>
                  <Button type="primary" onClick={this.handleUpdate.bind(this, record.id)}>编辑</Button>
                  <Divider type="vertical" />
                  <Button onClick={this.handleDelete.bind(this, this.id)}>删除</Button>
                </span>
              )}
            />
          </Table>
          <div className="terminal-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
            <Pagination total={200} defaultCurrent={1} onChange={this.onPageChange} />
          </div>
          <Modal
            title={modalTitle}
            visible={visible}
            footer={null}
            closable={false}
          >
            {
                modalType === 'delete' ? <DeviceFormDelete handleClose={this.handleClose} /> : null
            }
          </Modal>
        </div>
      );
    }
}

export default withRouter(Terminal);
