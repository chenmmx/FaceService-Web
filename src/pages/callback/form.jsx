import React, { Component } from 'react';
import {
  Form, Input, Button, Select, notification
} from 'antd';
import PropTypes from 'prop-types';
import CallbackService from '@/services/callback.service';

export class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      applyId: '',
      cameraUrl: '',
      redpupilUrl: ''
    };
  }

  // 获取信息
  getInfo = async () => {
    let res = await CallbackService.Get({
      id: this.props.id
    });
  }

  // 添加回调
  addCallback = async () => {
    const res = await CallbackService.add({
      applyId: this.state.applyId,
      cameraUrl: this.state.cameraUrl,
      redpupilUrl: this.state.redpupilUrl
    });
    if (res.status === 0) {
      notification.success({
        message: '成功',
        description: '添加成功'
      });
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
  }

  // 编辑回调
  editCallback = async () => {
    const res = await CallbackService.update({
      id: this.props.itemData.id,
      applyId: this.state.applyId,
      cameraUrl: this.state.cameraUrl,
      redpupilUrl: this.state.redpupilUrl
    });
    if (res.status === 0) {
      notification.success({
        message: '成功',
        description: '修改成功'
      });
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.setState({
          loading: true,
          applyId: values.applyId,
          cameraUrl: values.cameraUrl,
          redpupilUrl: values.redpupilUrl
        });
        if (this.props.modelType === 'add') {
          await this.addCallback();
        } else {
          await this.editCallback();
        }
        this.setState({
          loading: false
        });
        this.props.handleCancel();
        this.props.getTableData();
        this.props.form.resetFields();
        // console.log(values);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { handleCancel, itemData, applyList } = this.props;
    const { getFieldDecorator, resetFields } = this.props.form;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="应用">
            {getFieldDecorator('applyId', {
              rules: [{ required: true, message: '请选择应用' }],
              initialValue: itemData.applyId
            })(
              <Select allowClear placeholder="请选择应用">
                {
                  applyList.map((item) => (
                    <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="摄像机回调地址">
            {getFieldDecorator('cameraUrl', {
              rules: [{ required: true, message: '请输入摄像机回调地址' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确网址'
              }],
              initialValue: itemData.cameraUrl ? itemData.cameraUrl : ''
            })(
              <Input placeholder="请输入摄像机回调的URL" />
            )}
          </Form.Item>
          <Form.Item label="赤眸回调地址">
            {getFieldDecorator('redpupilUrl', {
              rules: [{ required: true, message: '请输入赤眸回调地址' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确网址'
              }],
              initialValue: itemData.redpupilUrl ? itemData.redpupilUrl : ''
            })(
              <Input placeholder="请输入赤眸回调的URL" />
            )}
          </Form.Item>
          <div style={{ marginTop: 50, textAlign: 'center' }}>
            <Button
              style={{ marginRight: 20 }}
              onClick={() => { handleCancel(); resetFields(); }}
            >取消
            </Button>
            <Button type="primary" loading={loading} htmlType="submit">确定</Button>
          </div>
        </Form>
      </>
    );
  }
}

MyForm.propTypes = {
  handleCancel: PropTypes.func.isRequired
};

const MyForm1 = Form.create({ name: 'callbackForm' })(MyForm);

export default MyForm1;
