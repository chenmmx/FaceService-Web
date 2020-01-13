import React, { useState, useEffect, createContext } from 'react';
// import axios from 'axios';
import {
  Table, Button, Pagination, Divider, Input, Modal, Spin, notification
} from 'antd';
import FsTitle from '../../components/common/title';
import { AccountFormAdd, AccountFormDelete, AccountFormUpdate } from './form';
import './style.less';
import accountService from '@/services/account.service';


const { Column } = Table;
const { Search } = Input;

export const AccountContext = createContext();
const textInput = React.createRef();

const Account = () => {
  // 刷新数据
  const [refreshData, setDataList] = useState(false);
  // tableLoading
  const [tableLoading, setTableLoading] = useState(false);
  // table数据
  const [dataSource, setDataSource] = useState([]);
  // table数据总条数
  const [total, setTotal] = useState(0);
  // serch查询条件
  const [serch, setSerch] = useState('');
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
  const [itemData, setItemData] = useState({});
  const fetchData = async () => {
    setTableLoading(true);
    const data = await accountService.getListByPage({
      pageIndex: 1,
      pageSize: 10,
      name: serch
    });
    setTableLoading(false);
    if (data.status === 0) {
      setDataSource(data.result.list);
      setTotal(data.result.total);
    } else {
      notification.error({
        message: '失败',
        description: data.errorMsg
      });
    }
  };
  // 新增
  const handleAdd = () => {
    setVisible(true);
    setModalTitle('新增');
    setModalType('add');
  };

  // 编辑
  const handleUpdate = (data) => {
    setItemData(data);
    setVisible(true);
    setModalTitle('编辑');
    setModalType('update');
  };
  // 删除
  const handleDelete = (data) => {
    setItemData(data);
    setVisible(true);
    setModalTitle('删除');
    setModalType('delete');
  };

  // 搜索
  const handleSearch = (value) => {
    setSerch(value);
    setDataList(!refreshData);
  };

  // 页码改变
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    setDataList(!refreshData);
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
    // 副作用函数----componentDidMount componentDidUpdate componentWillUnmount
  useEffect(() => {
    fetchData();
  }, [refreshData]);

  return (
    <div id="account">
      <FsTitle title="账号管理" />
      <div className="account-header">
        <div className="account-header-left">
          <Search ref={textInput} style={{ width: 200 }} placeholder="请输入账号" onSearch={handleSearch} />
          <Button type="primary" onClick={handleAdd}>新增</Button>
        </div>
      </div>
      <Table loading={tableLoading} dataSource={dataSource} rowKey="id" pagination={false} style={{ paddingTop: '30px' }}>
        <Column title="账号" dataIndex="userName" key="userName" />
        <Column title="密码" dataIndex="password" key="password" />
        <Column
          title="操作"
          key="action"
          width={230}
          render={(text, data) => (
            <span>
              <Button type="primary" onClick={handleUpdate.bind(this, data)}>编辑</Button>
              <Divider type="vertical" />
              <Button onClick={handleDelete.bind(this, data)}>删除</Button>
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
        <AccountContext.Provider value={{
          setVisible, setLoading, itemData, setDataList, refreshData, textInput, setSerch
        }}
        >
          <Spin spinning={loading}>
            <AccountForm />
          </Spin>
        </AccountContext.Provider>
      </Modal>
    </div>
  );
};
export default Account;
