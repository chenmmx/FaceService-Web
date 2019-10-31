import React, { useContext } from 'react';
import {
  Form, Input, Button
} from 'antd';
import { AccountContext } from '../index';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 }
  }
};

const AccountFormAdd = ({ form }) => {
  const { setLoading, setVisible } = useContext(AccountContext);
  const { getFieldDecorator } = form;

  // 表单确认
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  return (
    <div className="account-form-add">
      <Form {...formItemLayout}>
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>确认</Button>
          <Button style={{ marginLeft: '20px' }} onClick={() => { setVisible(false); }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedAccountFormAdd = Form.create({ name: 'account_form_add' })(AccountFormAdd);

export default WrappedAccountFormAdd;
