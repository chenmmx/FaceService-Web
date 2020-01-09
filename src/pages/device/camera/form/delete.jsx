import React, { useContext } from 'react';
import { Button } from 'antd';
import { CameraContext } from '../index';

const CameraFormDelete = () => {
  const { setLoading, setVisible, cameraId } = useContext(CameraContext);

  const onSubmit = () => {
    setLoading(true);
    console.log(cameraId);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="camera-form-delete">
      <div className="camera-form-delete-title">确认删除当前选中账号？</div>
      <div className="camera-form-delete-btn">
        <Button type="primary" onClick={onSubmit}>确认</Button>
        <Button onClick={() => { setVisible(false); }}>取消</Button>
      </div>
    </div>
  );
};

export default CameraFormDelete;
