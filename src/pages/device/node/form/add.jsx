import React, { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import {
  Form, Input, Button, Select, notification
} from 'antd';
import { NodeContext } from '../index';
import redpupilService from '@/services/redpupil.service';
import cameraService from '@/services/camera.service';
import nodeService from '@/services/node.service';
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

const NodeFormAdd = ({ form }) => {
  const [list, setList] = useImmer({
    redpupilList: [],
    cameraList: [],
    applyList: []
  });
  const { setData, getNodeList, data } = useContext(NodeContext);
  const { getFieldDecorator } = form;

  const getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      console.log(res.result.list);
      setList((draft) => {
        draft.applyList = res.result.list;
      });
    }
  };

  // 获取赤眸列表
  const getRedpupilList = async (applyId) => {
    const res = await redpupilService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      applyId
    });
    if (res.status === 0) {
      setList((draft) => {
        draft.redpupilList = res.result.list;
      });
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
  };

  // 获取摄像机列表
  const getCameraList = async (applyId) => {
    const res = await cameraService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      applyId
    });
    if (res.status === 0) {
      setList((draft) => {
        draft.cameraList = res.result.list;
      });
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
  };

  const handleApplySelectChange = (applyId) => {
    form.setFieldsValue({
      redpupilIds: [],
      cameraIds: []
    });
    getRedpupilList(applyId);
    getCameraList(applyId);
  };

  useEffect(() => {
    if (data.visible) {
      // getRedpupilList();
      // getCameraList();
      getApplyList();
    }
  }, []);

  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const redpupilIdsList = values.redpupilIds || [];
        const cameraIdsList = values.cameraIds || [];
        const deviceList = [...redpupilIdsList, ...cameraIdsList];
        const res = await nodeService.add({
          id: values.id,
          name: values.name,
          applyId: values.applyId,
          deviceIds: deviceList
        });
        if (res.status === 0) {
          setData((draft) => {
            draft.visible = false;
          });
          getNodeList();
          notification.success({
            message: '成功',
            description: '新增节点成功'
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
    <div className="node-form-add">
      <Form {...formItemLayout}>
        <Form.Item label="节点id">
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '请输入节点ID' }]
          })(
            <Input
              placeholder="请输入节点id"
            />,
          )}
        </Form.Item>
        <Form.Item label="节点名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入节点名称' }]
          })(
            <Input
              placeholder="请输入节点名称"
            />,
          )}
        </Form.Item>
        <Form.Item label="应用">
          {getFieldDecorator('applyId', {
            rules: [{ required: true, message: '请选择应用' }]
          })(
            <Select allowClear placeholder="请选择应用" onChange={handleApplySelectChange}>
              {
                list.applyList.map((item) => (
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="赤眸">
          {getFieldDecorator('redpupilIds', {
            rules: [{ required: false, message: '请选择赤眸' }]
          })(
            <Select allowClear placeholder="请选择赤眸" mode="multiple">
              {list.redpupilList.map((item) => (<Option value={item.id} key={item.id}>{item.name}</Option>))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="摄像机">
          {getFieldDecorator('cameraIds', {
            rules: [{ required: false, message: '请选择摄像机' }]
          })(
            <Select allowClear placeholder="请选择摄像机" mode="multiple">
              {list.cameraList.map((item) => (<Option value={item.id} key={item.id}>{item.name}</Option>))}
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

const WrappedNodeFormAdd = Form.create({ name: 'node_form_add' })(NodeFormAdd);

export default WrappedNodeFormAdd;
