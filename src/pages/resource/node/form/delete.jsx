import React, { useContext, useState } from 'react';
import { Button, Spin, notification } from 'antd';
import { NodeContext } from '../index';
import nodeService from '@/services/node.service';

const NodeFormDelete = () => {
  const { data, setData, getNodeList } = useContext(NodeContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await nodeService.delete([data.nodeId]);
      setLoading(false);
      if (res.status === 0) {
        setData((draft) => {
          draft.pageIndex = 1;
          draft.visible = false;
        });
        notification.success({
          message: '成功',
          description: '删除节点成功'
        });
        getNodeList();
      } else {
        notification.error({
          message: '失败',
          description: res.errorMsg
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!data.visible) {
    return null;
  }
  return (
    <Spin spinning={loading}>
      <div className="node-form-delete">
        <div className="node-form-delete-title">确认删除当前选中节点？</div>
        <div className="node-form-delete-btn">
          <Button type="primary" onClick={onSubmit}>确认</Button>
          <Button onClick={() => { setData((draft) => { draft.visible = false; }); }}>取消</Button>
        </div>
      </div>
    </Spin>
  );
};

export default NodeFormDelete;
