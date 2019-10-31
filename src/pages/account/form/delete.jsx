import React, { useContext } from 'react';
import { Button } from 'antd';
import { AccountContext } from '../index';

const AccountFormDelete = () => {
  const { setLoading, setVisible, accountId } = useContext(AccountContext);

  const onSubmit = () => {
    setLoading(true);
    console.log(accountId);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
