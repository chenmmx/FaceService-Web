import React, { useContext } from 'react';
import { Button, notification } from 'antd';
import { DeviceContext } from '../index';
import deviceService from '@/services/device.service';

const DeviceFormDelete = () => {
  const {
    setLoading, setVisible, itemData, setDataList, refreshData, dataSource, currentPage, setCurrentPage
  } = useContext(DeviceContext);

  const onSubmit = async () => {
    setLoading(true);
    if (dataSource.length <= 1 && currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
    let data = await deviceService.delete([itemData.id]);
    if (data.status === 0) {
      notification.success({
        message: '成功',
        description: '删除成功'
      });
      setDataList(!refreshData);
      setLoading(false);
      setVisible(false);
    } else {
      setLoading(false);
      setVisible(false);
      notification.error({
        message: '失败',
        description: data.errorMsg
      });
    }
  };

  return (
    <div className="device-form-delete">
      <div className="device-form-delete-title">确认删除当前选中账号？</div>
      <div className="device-form-delete-btn">
        <Button type="primary" onClick={onSubmit}>确认</Button>
        <Button onClick={() => { setVisible(false); }}>取消</Button>
      </div>
    </div>
  );
};

export default DeviceFormDelete;
