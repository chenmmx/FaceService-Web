import React, { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
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

const CameraFormUpdate = ({ form }) => {
  const { setData, data, getCameraList } = useContext(CameraContext);
  const [list, setList] = useImmer({
    applyList: []
  });
  const { getFieldDecorator } = form;

  const getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      setList((draft) => {
        draft.applyList = res.result.list;
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await cameraService.getInfo({
          id: data.cameraId
        });
        if (res.status === 0) {
          const {
            name, ip, username, password, applyId
          } = res.result;
          form.setFieldsValue({
            name, ip, username, password, applyId
          });
        } else {
          console.log('error');
        }
      } catch (error) {
        console.log('error:', error);
      }
    };
    if (data.visible) {
      getApplyList();
      fetchData();
    }
  }, []);

  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const res = await cameraService.update({
          id: data.cameraId,
          ...values
        });
        if (res.status === 0) {
          setData((draft) => {
            draft.visible = false;
          });
          getCameraList();
          notification.success({
            message: '成功',
            description: '编辑摄像机成功'
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
    <div className="camera-form-update">
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
                list.applyList.map((item) => (
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

const WrappedCameraFormUpdate = Form.create({ name: 'camera_form_update' })(CameraFormUpdate);

export default WrappedCameraFormUpdate;
