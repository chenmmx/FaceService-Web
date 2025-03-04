import React, { Component } from 'react';
import {
  Form, Input, Button, notification
} from 'antd';
import FsTitle from '../../../../components/common/fs-title';
import applyService from '@/services/apply.service';
import './style.less';

class ApplicationCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { history } = this.props;
        this.setState({
          loading: true
        });
        let res = await applyService.add({
          ...values
        });
        this.setState({
          loading: false
        });
        if (res.status === 0) {
          notification.success({
            message: '成功',
            description: '新增成功'
          });
          history.push('/application');
        } else {
          notification.error({
            message: '失败',
            description: res.errorMsg
          });
        }
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { history } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div className="application-form">
        <FsTitle title="创建应用" />
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="application-form-main">
          <Form.Item label="应用名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入应用名称' }]
            })(
              <Input
                placeholder="请输入应用名称"
              />,
            )}
          </Form.Item>
          {/* <Form.Item label="识别回调">
            {getFieldDecorator('callback', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Select allowClear placeholder="请选择识别回调">
                <Option value="123">123</Option>
                <Option value="jack">jack</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="照片授权回调">
            {getFieldDecorator('image', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Select allowClear placeholder="请选择照片授权回调">
                <Option value="123">123</Option>
                <Option value="jack">jack</Option>
              </Select>
            )}
          </Form.Item> */}
          <Form.Item label="应用说明">
            {getFieldDecorator('remark', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Input
                placeholder="请输入应用说明"
              />,
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
            <Button onClick={() => { history.push('/application'); }} style={{ marginLeft: '20px' }}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedApplicationCreateForm = Form.create({ name: 'normal_login' })(ApplicationCreateForm);

export default WrappedApplicationCreateForm;
