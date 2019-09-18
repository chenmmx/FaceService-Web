import React, { Component } from 'react';
import {
  Form, Input, Button, Select
} from 'antd';
import FsTitle from '../../../../components/common/fs-title';
import './style.less';

const { Option } = Select;

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 500);
        console.log(values);
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
        <FsTitle title="人员管理" />
        <div style={{ padding: '0px 24px 0px', fontSize: 14, color: 'black' }}>基本信息</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="application-form-main">
          <Form.Item label="应用名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入应用名称' }]
            })(
              <Select allowClear placeholder="请选择应用名称">
                <Option value="123">123</Option>
                <Option value="jack">jack</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('personName', {
              rules: [{ required: true, message: '请输入姓名' }]
            })(
              <Input
                placeholder="请输入姓名"
              />
            )}
          </Form.Item>
          <Form.Item label="卡号(idNo)">
            {getFieldDecorator('idNo', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Input
                placeholder="请输入卡号"
              />
            )}
          </Form.Item>
          <Form.Item label="身份证号">
            {getFieldDecorator('idNumber', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Input
                placeholder="请输入身份证号"
              />,
            )}
          </Form.Item>
          <Form.Item label="身份证号">
            {getFieldDecorator('idNumber', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Input
                placeholder="请输入身份证号"
              />,
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Input
                placeholder="请输入手机号"
              />,
            )}
          </Form.Item>
          <Form.Item label="人员类型" className="personType">
            {getFieldDecorator('personType', {
              rules: [{ required: false, message: 'Please input your username!' }]
            })(
              <Input
                placeholder="请输入人员类型"
              />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
            <Button onClick={() => { history.push('/person'); }} style={{ marginLeft: '20px' }}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedAddPerson = Form.create({ name: 'normal_login' })(AddPerson);

export default WrappedAddPerson;
