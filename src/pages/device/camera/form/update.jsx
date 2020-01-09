import React, { useContext } from 'react';
import {
  Form, Input, Button
} from 'antd';
import { CameraContext } from '../index';

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

const CameraFormUpdate = ({ form }) => {
  const { setLoading, setVisible, cameraId } = useContext(CameraContext);
  const { getFieldDecorator } = form;

  // 表单确认
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('cameraId----', cameraId);
        console.log(values);
      }
    });
  };

  return (
    <div className="camera-form-update">
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

const WrappedCameraFormUpdate = Form.create({ name: 'camera_form_update' })(CameraFormUpdate);

export default WrappedCameraFormUpdate;
