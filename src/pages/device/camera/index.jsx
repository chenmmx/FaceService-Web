import React, { useState, useEffect } from 'react';
import {
  Button, Table, Divider, Pagination
} from 'antd';
import cameraService from '@/services/camera.service';
import './style.less';


const { Column } = Table;

const Camera = () => {
  console.log('camera');
  // 摄像机列表数据
  const [dataList, setDataList] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);

  // 获取摄像机列表
  const getCameraList = async () => {
    const data = await cameraService.getListByPage({
      pageIndex,
      pageSize,
      applyId: '7551f009-d4b2-4afd-bab5-782dd0521050'
    });
    // if()
  };

  // 页码改变
  const onPageChange = (currentPage) => {
    setPageIndex(currentPage);
  };
  useEffect(() => {
    getCameraList();
  }, []);
  return (
    <div className="camera">
      <div className="camera-header">
        <Button type="primary">新增</Button>
      </div>
      <Table dataSource={dataList} rowKey="id" pagination={false}>
        <Column title="设备名称" dataIndex="terminalName" key="terminalName" />
        <Column title="状态" dataIndex="state" key="state" />
        <Column title="保修期" dataIndex="warranty" key="warranty" />
        <Column title="IP" dataIndex="ip" key="ip" />
        <Column title="版本号" dataIndex="version" key="version" />
        <Column title="识别阈值" dataIndex="recongnizeThreshould" key="recongnizeThreshould" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <span>
              <Button type="primary">编辑</Button>
              <Divider type="vertical" />
              <Button>删除</Button>
            </span>
          )}
        />
      </Table>
      <div className="terminal-pagination" style={{ paddingTop: 30, textAlign: 'right' }}>
        <Pagination total={total} defaultCurrent={pageIndex} onChange={onPageChange} />
      </div>
    </div>
  );
};

export default Camera;
