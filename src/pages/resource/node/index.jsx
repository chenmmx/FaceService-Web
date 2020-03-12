import React, { useEffect, createContext } from 'react';
import { useImmer } from 'use-immer';
import { connect } from 'react-redux';
import {
  Button, Table, Divider, Pagination, Spin, Modal
} from 'antd';
import FsTitle from '@/components/common/title';
import { NodeFormAdd, NodeFormDelete, NodeFormUpdate } from './form';
import * as actionTypes from '@/store/actions/node';
import './style.less';

export const NodeContext = createContext();

const { Column } = Table;

const Node = (props) => {
  const [data, setData] = useImmer({
    dataList: [],
    total: 0,
    pageIndex: 1,
    loading: false,
    modalTitle: '',
    modalType: '',
    visible: false,
    nodeId: ''
  });

  const { getNodeListDispatch, nodeList, total } = props;

  // 获取摄像机列表
  const getNodeList = async (pageIndex = 1) => {
    setData((draft) => {
      draft.loading = true;
    });
    getNodeListDispatch({
      pageIndex,
      pageSize: 10,
      name: '',
      applyId: ''
    });
    setTimeout(() => {
      setData((draft) => {
        draft.loading = false;
      });
    }, 300);
  };

  useEffect(() => {
    getNodeList();
  }, []);

  // 页码改变
  const onPageChange = (currentPage) => {
    setData((draft) => {
      draft.pageIndex = currentPage;
    });
    getNodeList(currentPage);
  };

  const NodeForm = () => {
    switch (data.modalType) {
      case 'add': return (<NodeFormAdd />);
      case 'update': return (<NodeFormUpdate />);
      case 'delete': return (<NodeFormDelete />);
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
      draft.nodeId = id;
    });
  };
  // 删除
  const handleDelete = (id) => {
    setData((draft) => {
      draft.modalType = 'delete';
      draft.modalTitle = '删除';
      draft.visible = true;
      draft.nodeId = id;
    });
  };
  return (
    <div className="node">
      <FsTitle title="边缘节点管理" />
      <div className="node-header">
        <Button type="primary" onClick={handleAdd}>新增</Button>
      </div>
      <Spin spinning={data.loading} delay={100}>
        <Table dataSource={nodeList} rowKey="id" pagination={false}>
          <Column title="节点id" dataIndex="id" key="id" />
          <Column title="节点名称" dataIndex="name" key="name" />
          <Column
            width={300}
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
                <Button
                  type="primary"
                  onClick={() => {
                    handleUpdate(record.id);
                  }}
                >参数设置
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
        className="node-form"
      >
        <NodeContext.Provider value={{ setData, data, getNodeList }}>
          <NodeForm />
        </NodeContext.Provider>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { nodeList, total } = state.node;
  return {
    nodeList,
    total
  };
};

const mapDispatchToProps = (dispatch) => ({
  getNodeListDispatch: (formData) => { dispatch(actionTypes.getNodeList(formData)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
