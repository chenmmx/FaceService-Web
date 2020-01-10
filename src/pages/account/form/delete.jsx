import React, { useContext } from 'react';
import { Button, notification } from 'antd';
import { AccountContext } from '../index';
import accountService from '@/services/account.service';

const AccountFormDelete = () => {
  const {
    setLoading, setVisible, itemData, setDataList, refreshData
  } = useContext(AccountContext);

  const onSubmit = async () => {
    setLoading(true);
    let data = await accountService.delete([itemData.id]);
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
    <div className="account-form-delete">
      <div className="account-form-delete-title">确认删除当前选中账号？</div>
      <div className="account-form-delete-btn">
        <Button type="primary" onClick={onSubmit}>确认</Button>
        <Button onClick={() => { setVisible(false); }}>取消</Button>
      </div>
    </div>
  );
};

export default AccountFormDelete;
