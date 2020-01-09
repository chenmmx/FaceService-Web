import React, { useEffect, createContext } from 'react';
import { useImmer } from 'use-immer';
import {
  Button, Table, Divider, Pagination, Spin, Modal
} from 'antd';
import { CameraFormAdd, CameraFormDelete, CameraFormUpdate } from './form';
import cameraService from '@/services/camera.service';
import './style.less';

export const CameraContext = createContext();

const { Column } = Table;

const Camera = () => {
  // 摄像机列表数据
//   const [dataList, setDataList] = useImmer([]);
//   const [total, setTotal] = useImmer(0);
//   const [pageIndex, setPageIndex] = useImmer(1);
//   const [loading, setLoading] = useImmer(false);
//   const [modalType, setModalType] = useImmer('');
//   const [modalTitle, setModalTitle] = useImmer('');
//   const [visible, setVisible] = useImmer(false);
//   const [cameraId, setCameraId] = useImmer('');
  const [data, setData] = useImmer({
    dataList: [],
    total: 0,
    pageIndex: 1,
    loading: false,
    modalTitle: '',
    modalType: '',
    visible: false,
    cameraId: ''
  });

  // 获取摄像机列表
  const getCameraList = async () => {
    setData((draft) => {
      draft.loading = true;
    });
    try {
      const result = await cameraService.getListByPage({
        pageIndex: data.pageIndex,
        pageSize: 10,
        applyId: '7551f009-d4b2-4afd-bab5-782dd0521050'
      });
      setData((draft) => {
        draft.dataList = result.list;
        draft.loading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCameraList();
  }, []);

  // 页码改变
  const onPageChange = (currentPage) => {
    setData((draft) => {
      draft.pageIndex = currentPage;
    });
    getCameraList();
  };

  const CameraForm = () => {
    switch (data.modalType) {
      case 'add': return (<CameraFormAdd />);
      case 'update': return (<CameraFormUpdate />);
      case 'delete': return (<CameraFormDelete />);
      default: return (null);
    }
  };
  const handleUpdate = (id) => {
    setData((draft) => {
      draft.modalType = 'add';
      draft.modalTitle = '编辑摄像机';
      draft.visible = true;
    });
  };
  return (
    <div className="camera">
      <div className="camera-header">
        <Button type="primary">新增</Button>
      </div>
      <Spin spinning={data.loading} delay={100}>
        <Table dataSource={data.dataList} rowKey="id" pagination={false}>
          <Column title="设备名称" dataIndex="name" key="name" />
          <Column title="用户名" dataIndex="username" key="username" />
          <Column title="密码" dataIndex="password" key="password" />
          <Column title="IP" dataIndex="ip" key="ip" />
          <Column
            title="操作"
            key="action"
            render={(text) => (
              <span>
                <Button type="primary" onClick={handleUpdate.bind(text.id)}>编辑</Button>
                <Divider type="vertical" />
                <Button>删除</Button>
              </span>
            )}
          />
        </Table>
      </Spin>
      <div className="terminal-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
        <Pagination total={data.total} defaultCurrent={data.pageIndex} onChange={onPageChange} />
      </div>
      <Modal
        title={data.modalTitle}
        visible={data.visible}
        footer={null}
        closable={false}
        className="account-form"
      >
        <CameraContext.Provider value={{ setData, data }}>
          <Spin spinning={data.loading}>
            <CameraForm />
          </Spin>
        </CameraContext.Provider>
      </Modal>
    </div>
  );
};

export default Camera;
