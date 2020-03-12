import React, { useContext, useState, useEffect } from 'react';
import {
  Form, Input, Button, notification, Select
} from 'antd';
import { DeviceContext } from '../index';
import deviceService from '@/services/device.service';
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

const DeviceFormUpdate = ({ form }) => {
  const {
    setLoading, setVisible, setDataList, refreshData, visible, itemData
  } = useContext(DeviceContext);
  const { getFieldDecorator } = form;

  const [applyList, setApplyList] = useState([]);

  // 获取应用列表
  const getApplyList = async () => {
    const res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      setApplyList(res.result.list);
    }
  };

  // 获取编辑信息
  const getInfo = async () => {
    try {
      const res = await deviceService.getInfo(itemData.id);
      if (res.status === 0) {
        const {
          id, name, applyId, type
        } = res.result;
        form.setFieldsValue({
          id, name, applyId, type
        });
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (visible) {
      getApplyList();
    }
    getInfo();
  }, []);

  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        let data = await deviceService.update(values);
        if (data.status === 0) {
          notification.success({
            message: '成功',
            description: '编辑成功'
          });
          // textInput.current.input.state.value = '';
          // setSerch('');
          setVisible(false);
          setDataList(!refreshData);
          setLoading(false);
        } else {
          setVisible(false);
          setLoading(false);
          notification.error({
            message: '失败',
            description: data.errorMsg
          });
        }
      }
    });
  };

  return (
    <div className="device-form-add">
      <Form {...formItemLayout}>
        <Form.Item label="设备id">
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '请输入设备id' }]
          })(
            <Input
              disabled
              placeholder="请输入设备id"
            />,
          )}
        </Form.Item>
        <Form.Item label="设备名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入设备名称' }]
          })(
            <Input
              placeholder="请输入设备名称"
            />,
          )}
        </Form.Item>
        <Form.Item label="设备类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '驶入设备类型' }]
          })(
            <Input
              placeholder="请输入设备类型"
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
          <Button style={{ marginLeft: '20px' }} onClick={() => { setVisible(false); }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedDeviceFormUpdate = Form.create({ name: 'device_form_add' })(DeviceFormUpdate);

export default WrappedDeviceFormUpdate;
