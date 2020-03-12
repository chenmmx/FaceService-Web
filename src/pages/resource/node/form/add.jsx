import React, { useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import {
  Form, Input, Button, Select, notification
} from 'antd';
import { NodeContext } from '../index';
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
    loading: false,
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

  useEffect(() => {
    if (data.visible) {
      getApplyList();
    }
  }, []);

  // 表单确认
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        setList((draft) => {
          draft.loading = true;
        });
        const res = await nodeService.add({
          id: values.id,
          name: values.name,
          applyId: values.applyId
          // deviceIds: deviceList
        });
        setList((draft) => {
          draft.loading = false;
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

const WrappedNodeFormAdd = Form.create({ name: 'node_form_add' })(NodeFormAdd);

export default WrappedNodeFormAdd;
