import React, { useEffect, createContext } from 'react';
import { useImmer } from 'use-immer';
import { connect } from 'react-redux';
import {
  Button, Table, Divider, Pagination, Spin, Modal
} from 'antd';
import { CameraFormAdd, CameraFormDelete, CameraFormUpdate } from './form';
import * as actionTypes from '@/store/actions/camera';
import './style.less';

export const CameraContext = createContext();

const { Column } = Table;

const Camera = (props) => {
  const [data, setData] = useImmer({
    pageIndex: 1,
    loading: false,
    modalTitle: '',
    modalType: '',
    visible: false,
    cameraId: ''
  });

  const { cameraList, total, getCameraListDispatch } = props;

  // 获取摄像机列表
  const getCameraList = async (pageIndex = 1) => {
    // setData((draft) => {
    //   draft.loading = true;
    // });
    const { selectApplicationId } = props;
    getCameraListDispatch({
      pageIndex,
      pageSize: 10,
      name: '',
      applyId: selectApplicationId
    });
  };

  useEffect(() => {
    // getCameraList();
  }, []);

  // 页码改变
  const onPageChange = (currentPage) => {
    setData((draft) => {
      draft.pageIndex = currentPage;
    });
    getCameraList(currentPage);
  };

  const CameraForm = () => {
    switch (data.modalType) {
      case 'add': return (<CameraFormAdd />);
      case 'update': return (<CameraFormUpdate />);
      case 'delete': return (<CameraFormDelete />);
      default: return (null);
    }
  };
  // 新增
  const handleAdd = () => {
    setData((draft) => {
      draft.modalType = 'add';
      draft.modalTitle = '新增';
      draft.visible = true;
    });
  };
  // 编辑
  const handleUpdate = (id) => {
    setData((draft) => {
      draft.modalType = 'update';
      draft.modalTitle = '编辑';
      draft.visible = true;
      draft.cameraId = id;
    });
  };
  // 删除
  const handleDelete = (id) => {
    setData((draft) => {
      draft.modalType = 'delete';
      draft.modalTitle = '删除';
      draft.visible = true;
      draft.cameraId = id;
    });
  };
  return (
    <div className="camera">
      <div className="camera-header">
        <Button type="primary" onClick={handleAdd}>新增</Button>
      </div>
      <Spin spinning={data.loading} delay={100}>
        <Table dataSource={cameraList} rowKey="id" pagination={false}>
          <Column title="设备id" dataIndex="id" key="id" />
          <Column title="设备名称" dataIndex="name" key="name" />
          <Column title="用户名" dataIndex="username" key="username" />
          <Column title="密码" dataIndex="password" key="password" />
          <Column title="IP" dataIndex="ip" key="ip" />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    handleUpdate(record.id);
                  }}
                >编辑
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => handleDelete(record.id)}>删除</Button>
              </span>
            )}
          />
        </Table>
      </Spin>
      <div className="terminal-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
        <Pagination total={total} defaultCurrent={data.pageIndex} onChange={onPageChange} />
      </div>
      <Modal
        title={data.modalTitle}
        visible={data.visible}
        footer={null}
        closable={false}
        className="camera-form"
      >
        <CameraContext.Provider value={{ setData, data, getCameraList }}>
          <CameraForm />
        </CameraContext.Provider>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { cameraList, total } = state.camera;
  return {
    cameraList,
    total
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCameraListDispatch: (formData) => { dispatch(actionTypes.getCameraList(formData)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
