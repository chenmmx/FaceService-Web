import React, { useState, useEffect, createContext } from 'react';
import {
  Table, Button, Pagination, Divider, Input, Modal, Spin
} from 'antd';
import FsTitle from '../../components/common/title';
import { AccountFormAdd, AccountFormDelete, AccountFormUpdate } from './form';
import './style.less';

const { Column } = Table;
const { Search } = Input;

export const AccountContext = createContext();

function Account() {
  // table数据
  const [dataSource, setDataSource] = useState([]);
  // table数据总条数
  const [total, setTotal] = useState(20);
  // 当前页码
  const [currentPage, setCurrentPage] = useState(1);
  // 模态框标题
  const [modalTitle, setModalTitle] = useState('');
  // 控制模态框是否显示
  const [visible, setVisible] = useState(false);
  // 模态框类型
  const [modalType, setModalType] = useState('');
  // Loading
  const [loading, setLoading] = useState(false);
  // ID
  const [accountId, setAccountId] = useState('');

  // 副作用函数
  useEffect(() => {
    setDataSource([{
      id: '1',
      account: '胡彦斌',
      password: '1232'
    },
    {
      id: '2',
      account: '胡彦祖',
      password: '345'
    }]);
    setTotal(2);
  }, []);

  // 编辑
  const handleUpdate = (id) => {
    setAccountId(id);
    setVisible(true);
    setModalTitle('编辑');
    setModalType('update');
  };
  // 删除
  const handleDelete = (id) => {
    setAccountId(id);
    setVisible(true);
    setModalTitle('删除');
    setModalType('delete');
  };

  // 页码改变
  const onPageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // 账号表单
  const AccountForm = () => {
    switch (modalType) {
      case 'add': return (<AccountFormAdd />);
      case 'update': return (<AccountFormUpdate />);
      case 'delete': return (<AccountFormDelete />);
      default: return (null);
    }
  };

  return (
    <div id="account">
      <FsTitle title="账号管理" />
      <div className="account-header">
        <div className="account-header-left">
          <Search style={{ width: 200 }} placeholder="请输入账号" onSearch={(value) => console.log(value)} />
          <Button type="primary">新增</Button>
        </div>
      </div>
      <Table dataSource={dataSource} rowKey="id" pagination={false} style={{ paddingTop: '30px' }}>
        <Column title="账号" dataIndex="account" key="account" />
        <Column title="密码" dataIndex="password" key="password" />
        <Column
          title="操作"
          key="action"
          width={230}
          render={(text, data) => (
            <span>
              <Button type="primary" onClick={handleUpdate.bind(this, data.id)}>编辑</Button>
              <Divider type="vertical" />
              <Button onClick={handleDelete.bind(this, data.id)}>删除</Button>
            </span>
          )}
        />
      </Table>
      <div className="account-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
        <Pagination total={total} defaultCurrent={currentPage} onChange={onPageChange} />
      </div>
      <Modal
        title={modalTitle}
        visible={visible}
        footer={null}
        closable={false}
        className="account-form"
      >
        <AccountContext.Provider value={{ setVisible, setLoading, accountId }}>
          <Spin spinning={loading}>
            <AccountForm />
          </Spin>
        </AccountContext.Provider>
      </Modal>
    </div>
  );
}
export default Account;
