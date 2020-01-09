import React, { Component } from 'react';
import {
  Table, Button, Divider, Pagination, Modal
} from 'antd';
import { withRouter } from 'react-router-dom';
import DeviceFormDelete from './form/delete';
import redpupilService from '@/services/redpupil.service';

const { Column } = Table;
class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      dataList: [],
      visible: false,
      redpupilId: ''
    };
  }

  componentDidMount() {
    this.getTerminalList();
  }

  // 新增
  handleAdd = () => {
    const { history } = this.props;
    history.push('/device/add');
  };

  // 编辑
  handleUpdate = (id) => {
    console.log(id);
    const { history } = this.props;
    history.push(`/device/update/${id}`);
  };

  // 删除
  handleDelete = (id) => {
    this.setState({
      visible: true,
      modalType: 'delete',
      modalTitle: '确认提示',
      redpupilId: id
    });
    console.log(id);
  };

  // 弹框关闭
  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  // 获取设备列表
  getTerminalList = async () => {
    const { pageIndex, pageSize, redpupilId } = this.state;
    const res = await redpupilService.getListByPage({
      pageSize,
      pageIndex,
      applyId: '7551f009-d4b2-4afd-bab5-782dd0521050',
      name: ''
    });
    if (res.status === 0) {
      this.setState({
        dataList: res.result.list,
        total: res.result.total
      });
    }
  };

  // 页码改变
  onPageChange = (pageIndex, pageSize) => {
    this.setState({
      pageIndex,
      pageSize
    });
  };

  render() {
    const {
      modalType, modalTitle, visible, total, pageIndex, dataList, redpupilId
    } = this.state;
    return (
      <div className="terminal">
        <div className="node-header" style={{ paddingBottom: '20px' }}>
          <Button type="primary" onClick={this.handleAdd}>
            新增
          </Button>
        </div>
        <Table dataSource={dataList} rowKey="id" pagination={false}>
          <Column
            title="设备名称"
            dataIndex="name"
            key="name"
          />
          {/* <Column title="状态" dataIndex="state" key="state" /> */}
          <Column
            title="保修期"
            dataIndex="warranty"
            key="warranty"
            render={(text, record) => (
              <div>
                <span>{record.warrantyStartTime}</span>-
                <span>{record.warrantyEndTime}</span>
              </div>
            )}
          />
          <Column
            title="识别阈值"
            dataIndex="recognizeThreshold"
            key="recognizeThreshold"
            render={(text, record) => (
              <div>
                <span>{JSON.parse(record.thresholdSetting).recognizeThreshold}</span>
              </div>
            )}
          />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
                <Button
                  type="primary"
                  onClick={this.handleUpdate.bind(this, record.id)}
                >
                  编辑
                </Button>
                <Divider type="vertical" />
                <Button onClick={this.handleDelete.bind(this, record.id)}>
                  删除
                </Button>
              </span>
            )}
          />
        </Table>
        <div
          className="terminal-pagination"
          style={{ paddingTop: 30, textAlign: 'right' }}
        >
          <Pagination
            total={total}
            defaultCurrent={pageIndex}
            onChange={this.onPageChange}
          />
        </div>
        <Modal
          title={modalTitle}
          visible={visible}
          footer={null}
          closable={false}
        >
          {modalType === 'delete' ? (
            <DeviceFormDelete handleClose={this.handleClose} redpupilId={redpupilId} getTerminalList={this.getTerminalList} />
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default withRouter(Terminal);
