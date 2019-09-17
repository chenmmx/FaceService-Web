import React, { Component } from 'react';
import {
  Button, Icon, Table, Modal
} from 'antd';
import MyNotice from './notice';
import MyTitle from './title';
import './index.less';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
      deleteModal: false,
      confirmLoading: false

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
      deleteModal: true
    });
    console.log(id);
  }

  // 添加回调
  addRow() {
    const rows = this.state.data.length > 0 ? [...this.state.data] : [];
    rows.unshift({});
    // this.setState({
    //   data: rows
    // });
  }

  // 弹框取消
  handleCancel() {
    this.setState({
      deleteModal: false
    });
  }

  // 弹框确认删除
  handleOk() {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        deleteModal: false,
        confirmLoading: false
      });
    }, 2000);
  }

  render() {
    const { deleteModal, confirmLoading } = this.state;
    const columns = [
      {
        title: '回调名称',
        dataIndex: 'name',
        key: 'name'
        // render: (record, row) => {
        //   return (
        //     <Form>
        //       <Form.Item style={{ margin: 0 }}>
        //         {this.props.form.getFieldDecorator('name' + record.id, {
        //           rules: [{
        //             required: true,
        //             message: '请输入名称'
        //           }],
        //           initialValue: record.id
        //         })(<Input />)}
        //       </Form.Item>
        //     </Form>
        //   );
        // }
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
              <Button style={{ marginRight: 10 }}>编辑</Button>
              <Button onClick={this.handleDelete.bind(this, row.id)}>删除</Button>
            </>
          ) : null
        )
      }
    ];
    return (
      <div className="callback">
        <MyNotice message="温馨提示：注册照片接口新增照片质量检测功能，您可在人员管理模块添加照片进行体验。" />
        <MyTitle title="回调管理" />
        <div className="btn">
          <Button type="primary" ghost onClick={this.addRow.bind(this)}>添加回调</Button>
          <Icon type="info-circle" />
          <span>查看回调说明</span>
        </div>
        <Table rowKey="id" pagination columns={columns} dataSource={this.state.data} style={{ width: '70%' }} />
        {/* 删除提示框 */}
        <Modal
          title="提示"
          centered
          visible={deleteModal}
          onOk={this.handleOk.bind(this)}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>您确定要删除该回调吗？</p>
        </Modal>
      </div>
    );
  }
}

export default Callback;
