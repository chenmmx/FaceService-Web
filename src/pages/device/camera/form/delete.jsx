import React, { useContext, useState } from 'react';
import { Button, Spin, notification } from 'antd';
import { CameraContext } from '../index';
import cameraService from '@/services/camera.service';

const CameraFormDelete = () => {
  const { data, setData, getCameraList } = useContext(CameraContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await cameraService.delete([data.cameraId]);
      setLoading(false);
      if (res.status === 0) {
        setData((draft) => {
          draft.pageIndex = 1;
          draft.visible = false;
        });
        notification.success({
          message: '成功',
          description: '删除摄像机成功'
        });
        getCameraList();
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
      <div className="camera-form-delete">
        <div className="camera-form-delete-title">确认删除当前选中账号？</div>
        <div className="camera-form-delete-btn">
          <Button type="primary" onClick={onSubmit}>确认</Button>
          <Button onClick={() => { setData((draft) => { draft.visible = false; }); }}>取消</Button>
        </div>
      </div>
    </Spin>
  );
};

export default CameraFormDelete;
