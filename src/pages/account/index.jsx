import React, { useState, useEffect, createContext } from 'react';
// import axios from 'axios';
import {
  Table, Button, Pagination, Divider, Input, Modal, Spin
} from 'antd';
import FsTitle from '../../components/common/title';
import { AccountFormAdd, AccountFormDelete, AccountFormUpdate } from './form';
import './style.less';
import accountService from '@/services/account.service';


const { Column } = Table;
const { Search } = Input;

export const AccountContext = createContext();

const Account = () => {
  // table数据
  const [dataSource, setDataSource] = useState([]);
  // table数据总条数
  const [total, setTotal] = useState(0);
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
  // 账号ID
  const [accountId, setAccountId] = useState('');

  // 副作用函数----componentDidMount componentDidUpdate componentWillUnmount
  useEffect(() => {
    const fetchData = async () => {
      const data = await accountService.getListByPage({
        pageIndex: 1,
        pageSize: 10
      });
      console.log('data', data);
    };
    fetchData();
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

  // 新增
  const handleAdd = () => {
    setVisible(true);
    setModalTitle('新增');
    setModalType('add');
  };

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

  // 搜索
  const handleSearch = (value) => {
    console.log(value);
  };

  // 页码改变
  const handlePageChange = (pageIndex) => {
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
          <Search style={{ width: 200 }} placeholder="请输入账号" onSearch={handleSearch} />
          <Button type="primary" onClick={handleAdd}>新增</Button>
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
        <Pagination total={total} defaultCurrent={currentPage} onChange={handlePageChange} />
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
};
export default Account;
