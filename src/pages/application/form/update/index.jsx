import React, { Component } from 'react';
import {
  Form, Input, Button, notification
} from 'antd';
import applyService from '@/services/apply.service';
import './style.less';

class ApplicationUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }


  componentDidMount() {
    this.props.form.setFieldsValue({
      appId: '1243243asfase2432sf1e3sda',
      appSecret: '1243243asfase2432sf1e3sda'
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { applyId } = this.props;
        this.setState({
          loading: true
        });
        let res = await applyService.add({
          id: applyId,
          userId: window.localStorage.getItem('userId'),
          name: values.name,
          remark: values.remark
        });
        this.setState({
          loading: false
        });
        if (res.status === 0) {
          notification.success({
            message: '成功',
            description: '新增成功'
          });
        } else {
          notification.error({
            message: '失败',
            description: res.errorMsg
          });
        }
        console.log(values);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { handleClose } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div className="application-form-update">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="application-form-update-main">
          <Form.Item label="appId">
            {getFieldDecorator('appId', {
            })(
              <Input
                placeholder=""
                disabled
              />,
            )}
          </Form.Item>
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
          </Form.Item>
          <Form.Item label="appKey">
            {getFieldDecorator('appKey', {
            })(
              <Input
                placeholder=""
                disabled
              />,
            )}
          </Form.Item> */}
          <Form.Item label="secret">
            {getFieldDecorator('secret', {
            })(
              <Input
                placeholder=""
                disabled
              />,
            )}
          </Form.Item>
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
            <Button onClick={() => { handleClose(); }} style={{ marginLeft: '20px' }}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedApplicationUpdateForm = Form.create({ name: 'normal_login' })(ApplicationUpdateForm);

export default WrappedApplicationUpdateForm;
