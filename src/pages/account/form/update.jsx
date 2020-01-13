import React, { useContext } from 'react';
import {
  Form, Input, Button, notification
} from 'antd';
import { AccountContext } from '../index';
import accountService from '@/services/account.service';

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

const AccountFormUpdate = ({ form }) => {
  const {
    setLoading, setVisible, itemData, setDataList, refreshData, textInput, setSerch
  } = useContext(AccountContext);
  const { getFieldDecorator } = form;

  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        let data = await accountService.update({ id: itemData.id, ...values });
        if (data.status === 0) {
          notification.success({
            message: '成功',
            description: '修改成功'
          });
          textInput.current.input.state.value = '';
          setSerch('');
          setDataList(!refreshData);
          setLoading(false);
          setVisible(false);
        } else {
          setLoading(false);
          setVisible(false);
          notification.error({
            message: '失败',
            description: data.errorMsg
          });
        }
      }
    });
  };

  return (
    <div className="account-form-update">
      <Form {...formItemLayout}>
        <Form.Item label="用户名">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '至少8-20个字符，包含字符数字', pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/ }],
            initialValue: itemData.userName
          })(
            <Input
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '至少8-20个字符，至少1个大写字母，1个小写字母和1个数字和1个特殊字符', pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/ }],
            initialValue: itemData.password
          })(
            <Input
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            rules: [{ required: false, message: '请输入正确手机号', pattern: /^1[3456789]\d{9}$/ }],
            initialValue: itemData.phone
          })(
            <Input
              placeholder="请输入手机号"
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

const WrappedAccountFormUpdate = Form.create({ name: 'account_form_update' })(AccountFormUpdate);

export default WrappedAccountFormUpdate;
