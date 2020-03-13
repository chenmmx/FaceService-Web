import React, { useState, useEffect, createContext } from 'react';
// import axios from 'axios';
import {
  Table, Button, Pagination, Divider, Input, Modal, Spin, notification
} from 'antd';
import FsTitle from '@/components/common/title';
import {
  DeviceFormAdd, DeviceFormDelete, DeviceFormUpdate, DeviceFormParams
} from './form';
import './style.less';
import deviceService from '@/services/device.service';


const { Column } = Table;
const { Search } = Input;

export const DeviceContext = createContext();

const Device = () => {
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
    const data = await deviceService.getListByPage({
      pageIndex: 1,
      pageSize: 10
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
  // // 新增
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
  // 参数设置
  const handleParams = (data) => {
    setItemData(data);
    setVisible(true);
    setModalTitle('参数设置');
    setModalType('params');
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

  // 隐藏弹框
  const hideModal = () => {
    setVisible(false);
  };

  // 账号表单
  const DeviceForm = () => {
    switch (modalType) {
      case 'add': return (<DeviceFormAdd />);
      case 'update': return (<DeviceFormUpdate />);
      case 'delete': return (<DeviceFormDelete />);
      case 'params': return (<DeviceFormParams hideModal={hideModal} itemData={itemData} />);
      default: return (null);
    }
  };

  // 副作用函数----componentDidMount componentDidUpdate componentWillUnmount
  useEffect(() => {
    fetchData();
  }, [refreshData]);

  return (
    <div id="device">
      <FsTitle title="设备管理" />
      <div className="device-header">
        <div className="device-header-left">
          <Button type="primary" onClick={handleAdd}>新增</Button>
        </div>
      </div>
      <Table loading={tableLoading} dataSource={dataSource} rowKey="id" pagination={false} style={{ paddingTop: '30px' }}>
        <Column title="设备id" dataIndex="id" key="id" />
        <Column title="设备名称" dataIndex="name" key="name" />
        <Column
          title="操作"
          key="action"
          width={300}
          render={(text, data) => (
            <span>
              <Button type="primary" onClick={handleUpdate.bind(this, data)}>编辑</Button>
              <Divider type="vertical" />
              <Button type="primary" onClick={handleParams.bind(this, data)}>参数设置</Button>
              <Divider type="vertical" />
              <Button onClick={handleDelete.bind(this, data)}>删除</Button>
            </span>
          )}
        />
      </Table>
      <div className="device-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
        <Pagination total={total} defaultCurrent={currentPage} onChange={handlePageChange} />
      </div>
      <Modal
        title={modalTitle}
        visible={visible}
        footer={null}
        closable={false}
        className="device-form"
      >
        <DeviceContext.Provider value={{
          visible, setVisible, setLoading, itemData, setDataList, refreshData, setSerch, dataSource, currentPage, setCurrentPage
        }}
        >
          <Spin spinning={loading}>
            <DeviceForm />
          </Spin>
        </DeviceContext.Provider>
      </Modal>
    </div>
  );
};
export default Device;
