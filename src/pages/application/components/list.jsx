import React, { Component } from 'react';
import {
  Button, Modal, Table, Divider, Pagination
} from 'antd';
import ApplicationUpdateForm from '../form/update';
import ApplicationDeleteForm from '../form/delete';
import applyService from '@/services/apply.service';

const { Column } = Table;
class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalTitle: '',
      modalType: '',
      applyId: '',
      pageIndex: 1,
      dataList: [],
      total: 0,
      loading: false
    };
  }

  componentDidMount() {
    this.getApplyList();
  }

  getApplyList = async () => {
    const { pageIndex } = this.state;
    this.setState({
      loading: true
    });
    let res = await applyService.getListByPage({
      pageIndex,
      pageSize: 10,
      name: ''
    });
    if (res.status === 0) {
      this.setState({
        dataList: res.result.list,
        total: res.result.total,
        loading: false
      });
    }
  }


  // 编辑
  onUpdate = (id) => {
    this.setState({
      modalType: 'update',
      modalTitle: '编辑',
      visible: true,
      applyId: id
    });
  }

  // 下线
  onOffline = (id) => {
    this.setState({
      modalType: 'delete',
      modalTitle: '确认提示',
      visible: true,
      applyId: id
    });
  }

  // 弹框确认
  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  // 弹框取消
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handlePageChange(pageIndex) {
    this.setState({
      pageIndex
    }, () => {
      this.getApplyList();
    });
  }

  render() {
    const {
      modalType, modalTitle, applyId, total, dataList, loading
    } = this.state;
    return (
      <div className="application-list">
        {/* <h3 className="application-list--title" /> */}
        <Table loading={loading} dataSource={dataList} rowKey="id" pagination={false} style={{ paddingTop: '30px' }}>
          <Column title="应用名称" dataIndex="name" key="name" />
          <Column title="应用id" dataIndex="id" key="id" />
          <Column title="secret" dataIndex="secret" key="secret" />
          <Column title="创建时间" dataIndex="createTime" key="createTime" />
          <Column title="应用说明" dataIndex="remark" key="remark" />
          <Column
            title="操作"
            key="action"
            width={230}
            render={(text) => (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    this.onUpdate(text.id);
                  }}
                >编辑
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => {
                  this.onOffline(text.id);
                }}
                >下线
                </Button>
              </span>
            )}
          />
        </Table>
        <div className="account-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
          <Pagination total={total} defaultCurrent={1} onChange={this.handlePageChange.bind(this)} />
        </div>
        <Modal
          title={modalTitle}
          visible={this.state.visible}
          footer={null}
          closable={false}
        >
          {
                modalType === 'update' ? <ApplicationUpdateForm applyId={applyId} handleClose={this.handleClose} getApplyList={this.getApplyList} /> : <ApplicationDeleteForm applyId={applyId} handleClose={this.handleClose} getApplyList={this.getApplyList} />
            }
        </Modal>
      </div>
    );
  }
}

export default ApplicationList;
