import React, { Component } from 'react';
import {
  Button, Icon, Table, Modal, Form, Pagination, notification
} from 'antd';
import MyNotice from '../../components/common/notice';
import MyTitle from '../../components/common/title';
import CallbackService from '@/services/callback.service';
import applyService from '@/services/apply.service';
import MyForm1 from './form';
import './index.less';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      data: [],
      itemData: {},
      applyList: [],
      deleteModal: false,
      confirmLoading: false,
      modelType: 'add',
      modelTitle: '提示',
      callbackId: '',
      loading: false
    };
  }


  // 数据渲染
  async componentDidMount() {
    this.getTableData();
  }

  // 页码改变
  async onPageChange(pageIndex) {
    await this.setState({
      pageIndex
    });
    this.getTableData();
  }

  // 获取数据
  async getTableData() {
    this.setState({
      loading: true
    });
    const res = await CallbackService.getListByPage({
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      name: ''
    });
    this.setState({
      loading: false
    });
    if (res.status === 0) {
      this.setState({
        total: res.result.total,
        data: res.result.list
      });
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
  }

  // 获取应用列表
  getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      // console.log(res.result.list);
      await this.setState({
        applyList: res.result.list
      });
    }
  }

  // 删除行
  handleDelete(id) {
    this.setState({
      deleteModal: true,
      modelType: 'delete',
      modelTitle: '提示',
      callbackId: id
    });
  }

  // 添加回调
  addRow() {
    this.getApplyList();
    this.setState({
      deleteModal: true,
      modelType: 'add',
      modelTitle: '添加回调'
    });
  }

  // 编辑回调
  editCallback(item) {
    this.getApplyList();
    console.log(item);
    this.setState({
      deleteModal: true,
      modelType: 'edit',
      modelTitle: '编辑回调',
      itemData: item
    });
    // console.log(id);
  }

  // 弹框取消
  handleCancel() {
    this.setState({
      deleteModal: false,
      itemData: {}
    });
  }

  // 添加请求
  addOK() {
    console.log('add');
  }

  // 编辑请求
  editOK() {
    console.log('edit');
  }

  // 删除请求
  async deleteOK(id) {
    this.setState({
      confirmLoading: true
    });
    let res = await CallbackService.delete([id]);
    if (res.status === 0) {
      notification.success({
        message: '成功',
        description: '删除成功'
      });
      this.getTableData();
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
    this.setState({
      deleteModal: false,
      confirmLoading: false
    });
    console.log(id);
  }

  render() {
    const {
      deleteModal, confirmLoading, modelTitle, callbackId, modelType, itemData, applyList, loading, pageIndex, total, data
    } = this.state;
    const columns = [
      {
        title: '回调名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '摄像机回调地址',
        dataIndex: 'cameraUrl',
        key: 'cameraUrl'
      }, {
        title: '赤眸回调地址',
        dataIndex: 'redpupilUrl',
        key: 'redpupilUrl'
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, row) => (
          this.state.data.length >= 1 ? (
            <>
              <Button
                style={{ marginRight: 10 }}
                onClick={this.editCallback.bind(this, row)}
              >
                编辑
              </Button>
              <Button onClick={this.handleDelete.bind(this, row.id)}>删除</Button>
            </>
          ) : null
        )
      }
    ];
    const deleteContent = (
      <>
        <p style={{ fontSize: 18 }}>您确定要删除该回调吗？</p>
        <div style={{ marginTop: 50, textAlign: 'center' }}>
          <Button onClick={this.handleCancel.bind(this)} style={{ marginRight: 20 }}>取消</Button>
          <Button type="primary" onClick={this.deleteOK.bind(this, callbackId)}>确定</Button>
        </div>
      </>
    );
    return (
      <div className="callback">
        <MyNotice message="温馨提示：注册照片接口新增照片质量检测功能，您可在人员管理模块添加照片进行体验。" />
        <MyTitle title="回调管理" />
        <div className="btn">
          <Button type="primary" ghost onClick={this.addRow.bind(this)}>添加回调</Button>
          <Icon type="info-circle" />
          <span>查看回调说明</span>
        </div>
        <Table loading={loading} pagination={false} rowKey="id" columns={columns} dataSource={data} />
        <div className="callback-panination" style={{ paddingTop: 30, textAlign: 'right' }}>
          <Pagination current={pageIndex} onChange={this.onPageChange.bind(this)} pageSize={10} total={total} />
        </div>
        {/* 删除提示框 */}
        <Modal
          title={modelTitle}
          centered
          destroyOnClose
          visible={deleteModal}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel.bind(this)}
          footer={false}
        >
          {
            modelType === 'delete'
              ? deleteContent
              : (
                <MyForm1
                  itemData={itemData}
                  applyList={applyList}
                  modelType={modelType}
                  getTableData={this.getTableData.bind(this)}
                  handleCancel={this.handleCancel.bind(this)}
                />
              )
          }
        </Modal>
      </div>
    );
  }
}

export default Form.create({ name: 'callback' })(Callback);
