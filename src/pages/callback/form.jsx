import React, { Component } from 'react';
import { Form, Input } from 'antd';
// import PropTypes from 'prop-types';

export class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="回调名称">
          { getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入回调名称' }]
          })(
            <Input placeholder="请输入名称" />
          ) }
        </Form.Item>
        <Form.Item label="回调地址">
          { getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入回调名称' }]
          })(
            <Input placeholder="请输入回调的URL" />
          ) }
        </Form.Item>
      </Form>
    );
  }
}

const MyForm1 = Form.create({ name: 'callbackForm' })(MyForm);

export default MyForm1;
