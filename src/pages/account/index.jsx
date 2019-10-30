import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import FsTitle from '../../components/common/title';


function Account() {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ];

  useEffect(() => {
    setDataSource([{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }]);
  }, []);

  return (
    <div>
      <FsTitle title="账号管理" />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
export default Account;
