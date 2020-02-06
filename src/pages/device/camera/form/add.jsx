import React, { useContext, useEffect, useState } from 'react';
import {
  Form, Input, Button, Select, notification
} from 'antd';
import { CameraContext } from '../index';
import cameraService from '@/services/camera.service';
import applyService from '@/services/apply.service';

const { Option } = Select;

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

const CameraFormAdd = ({ form }) => {
  const { setData, getCameraList } = useContext(CameraContext);
  const { applyList, setApplyList } = useState([]);
  const { getFieldDecorator } = form;

  const getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      console.log(res.result.list);
      setApplyList(res.result.list);
    }
  };
  useEffect(() => {
    getApplyList();
  }, []);
  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await cameraService.add(values);
        if (res.status === 0) {
          setData((draft) => {
            draft.visible = false;
          });
          getCameraList();
          notification.success({
            message: '成功',
            description: '新增摄像机成功'
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
    <div className="camera-form-add">
      <Form {...formItemLayout}>
        <Form.Item label="设备名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入设备名称' }]
          })(
            <Input
              placeholder="请输入设备名称"
            />,
          )}
        </Form.Item>
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
        <Form.Item label="ip">
          {getFieldDecorator('ip', {
            rules: [{ required: true, message: '请输入IP' }]
          })(
            <Input
              placeholder="请输入IP"
            />,
          )}
        </Form.Item>
        <Form.Item label="应用">
          {getFieldDecorator('applyId', {
            rules: [{ required: true, message: '请选择应用' }]
          })(
            <Select allowClear placeholder="请选择应用">
              {
                applyList.map((item) => (
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>确认</Button>
          <Button style={{ marginLeft: '20px' }} onClick={() => { setData((draft) => { draft.visible = false; }); }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedCameraFormAdd = Form.create({ name: 'camera_form_add' })(CameraFormAdd);

export default WrappedCameraFormAdd;
