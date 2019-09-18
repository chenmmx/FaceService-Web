import React, { Component } from 'react';
import {
  Button, Icon, Table, Modal
} from 'antd';
import MyNotice from '../../components/common/notice';
import MyTitle from '../../components/common/title';
import MyForm1 from './form';
import './index.less';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
      deleteModal: false,
      confirmLoading: false,
      modelType: 'add',
      modelTitle: '提示'
    };
  }

  // 数据渲染
  componentDidMount() {
    const data = [
      {
        id: 1,
        name: '111',
        address: 'http://11.1.1.1'
      },
      {
        id: 2,
        name: '222',
        address: 'http://2.2.2.2'
      }
    ];
    this.setState({
      data
    });
  }


  // 删除行
  handleDelete(id) {
    this.setState({
      deleteModal: true,
      modelType: 'delete',
      modelTitle: '提示'
    });
    console.log(id);
  }

  // 添加回调
  addRow() {
    this.setState({
      deleteModal: true,
      modelType: 'add',
      modelTitle: '添加回调'
    });
  }

  // 编辑回调
  editCallback(id) {
    this.setState({
      deleteModal: true,
      modelType: 'edit',
      modelTitle: '编辑回调'
    });
    console.log(id);
  }

  // 弹框取消
  handleCancel() {
    this.setState({
      deleteModal: false
    });
  }

  // 弹框确认
  handleOk() {
    this.setState({
      confirmLoading: true
    });
    if (this.state.modelType === 'delete') {
      this.deleteOK();
    } else if (this.state.modelType === 'add') {
      this.addOK();
    } else if (this.state.modelType === 'edit') {
      this.editOK();
    }
    setTimeout(() => {
      this.setState({
        deleteModal: false,
        confirmLoading: false
      });
    }, 2000);
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
  deleteOK() {
    console.log('delete');
  }

  render() {
    const { deleteModal, confirmLoading, modelTitle } = this.state;
    const columns = [
      {
        title: '回调名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '回调地址',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, row) => (
          this.state.data.length >= 1 ? (
            <>
              <Button
                style={{ marginRight: 10 }}
                onClick={this.editCallback.bind(this, row.id)}
              >
                编辑
              </Button>
              <Button onClick={this.handleDelete.bind(this, row.id)}>删除</Button>
            </>
          ) : null
        )
      }
    ];
    // 模态框内容
    let modelContent;
    if (this.state.modelType === 'delete') {
      modelContent = <p>您确定要删除该回调吗？</p>;
    } else if (this.state.modelType === 'add' || this.state.modelType === 'edit') {
      modelContent = <MyForm1 />;
    }
    return (
      <div className="callback">
        <MyNotice message="温馨提示：注册照片接口新增照片质量检测功能，您可在人员管理模块添加照片进行体验。" />
        <MyTitle title="回调管理" />
        <div className="btn">
          <Button type="primary" ghost onClick={this.addRow.bind(this)}>添加回调</Button>
          <Icon type="info-circle" />
          <span>查看回调说明</span>
        </div>
        <Table rowKey="id" pagination columns={columns} dataSource={this.state.data} />
        {/* 删除提示框 */}
        <Modal
          title={modelTitle}
          centered
          visible={deleteModal}
          onOk={this.handleOk.bind(this)}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          { modelContent }
        </Modal>
      </div>
    );
  }
}

export default Callback;
