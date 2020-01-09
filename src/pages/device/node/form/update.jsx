import React, { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import {
  Form, Input, Button, Select, notification
} from 'antd';
import { NodeContext } from '../index';
import redpupilService from '@/services/redpupil.service';
import cameraService from '@/services/camera.service';
import nodeService from '@/services/node.service';


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

const NodeFormUpdate = ({ form }) => {
  const [list, setList] = useImmer({
    redpupilList: [],
    cameraList: []
  });
  const { setData, data, getNodeList } = useContext(NodeContext);
  const { getFieldDecorator } = form;

  // 获取赤眸列表
  const getRedpupilList = async () => {
    const res = await redpupilService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      applyId: '7551f009-d4b2-4afd-bab5-782dd0521050'
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
  const getCameraList = async () => {
    const res = await cameraService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      applyId: '7551f009-d4b2-4afd-bab5-782dd0521050'
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await nodeService.getInfo({
          id: data.nodeId
        });
        if (res.status === 0) {
          const {
            name, ip, applyId
          } = res.result;
          console.log(res.result.list);
          let redpupilIds = [];
          let cameraIds = [];
          if (res.result.list) {
            res.result.list.map((item) => {
              if (item.type === 0) {
                redpupilIds.push(item.deviceId);
              } else {
                cameraIds.push(item.deviceId);
              }
              return item;
            });
          }
          form.setFieldsValue({
            name, ip, applyId, redpupilIds, cameraIds
          });
        } else {
          console.log('error');
        }
      } catch (error) {
        console.log('error:', error);
      }
    };
    if (data.visible) {
      fetchData();
      getRedpupilList();
      getCameraList();
    }
  }, []);

  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      console.log(values);
      if (!err) {
        const redpupilIdsList = values.redpupilIds || [];
        const cameraIdsList = values.cameraIds || [];
        const deviceList = [...redpupilIdsList.map((item) => ({
          type: 0,
          deviceId: item
        })), ...cameraIdsList.map((item) => ({
          type: 1,
          deviceId: item
        }))];
        const res = await nodeService.update({
          id: data.nodeId,
          name: values.name,
          applyId: values.applyId,
          list: deviceList
        });
        if (res.status === 0) {
          setData((draft) => {
            draft.visible = false;
          });
          getNodeList();
          notification.success({
            message: '成功',
            description: '编辑节点成功'
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
    <div className="node-form-update">
      <Form {...formItemLayout}>
        <Form.Item label="节点名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入节点名称' }]
          })(
            <Input
              placeholder="请输入节点名称"
            />,
          )}
        </Form.Item>
        <Form.Item label="赤眸">
          {getFieldDecorator('redpupilIds', {
            rules: [{ required: false, message: '请选择赤眸' }]
          })(
            <Select allowClear placeholder="请选赤眸" mode="multiple">
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
        <Form.Item label="应用">
          {getFieldDecorator('applyId', {
            rules: [{ required: true, message: '请选择应用' }]
          })(
            <Select allowClear placeholder="请选择应用">
              <Option value="7551f009-d4b2-4afd-bab5-782dd0521050">7551f009-d4b2-4afd-bab5-782dd0521050</Option>
              <Option value="jack">jack</Option>
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

const WrappedNodeFormUpdate = Form.create({ name: 'node_form_update' })(NodeFormUpdate);

export default WrappedNodeFormUpdate;
