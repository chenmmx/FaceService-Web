import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import {
  Form, Input, Button, notification
} from 'antd';
import FsTitle from '@/components/common/fs-title';
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
  const { getFieldDecorator } = form;
  const [data, setData] = useImmer({
    loading: false,
    btnLoading: false,
    accountId: ''
  });

  // 获取账号信息
  const getAccountInfo = async () => {
    setData((draft) => {
      draft.loading = true;
    });
    const { result, status } = await accountService.getInfo();
    setData((draft) => {
      draft.accountId = result.id;
      draft.loading = false;
    });
    if (status === 0) {
      form.setFieldsValue(result);
    }
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        setData((draft) => {
          draft.btnLoading = true;
        });
        let res = await accountService.update({ id: data.accountId, ...values });
        setData((draft) => {
          draft.btnLoading = false;
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
    });
  };

  return (
    <div className="account-form-update">
      <FsTitle title="账号管理" />
      <Form {...formItemLayout} style={{ width: '30%', marginTop: '100px' }}>
        <Form.Item label="用户名">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '至少8-20个字符，包含字符数字', pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/ }]
          })(
            <Input
              disabled
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '至少8-20个字符，至少1个大写字母，1个小写字母和1个数字和1个特殊字符', pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/ }]
          })(
            <Input
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            rules: [{ required: false, message: '请输入正确手机号', pattern: /^1[3456789]\d{9}$/ }]
          })(
            <Input
              placeholder="请输入手机号"
            />,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit} loading={data.btnLoading}>确认</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedAccountFormUpdate = Form.create({ name: 'account_form_update' })(AccountFormUpdate);

export default WrappedAccountFormUpdate;
