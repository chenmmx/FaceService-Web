import React from 'react';
import { Table, Button } from 'antd';

export default class recordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'guid',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '人员类型',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '卡号(idNo)',
          dataIndex: 'address',
          key: '2'
        },
        {
          title: '创建时间',
          dataIndex: 'address',
          key: '3'
        },
        {
          title: '注册照片',
          dataIndex: 'address',
          key: '4'
        },
        {
          title: '照片授权状态',
          dataIndex: 'address',
          key: '5'
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
          render: (text, row) => (
            this.props.dataSource.length >= 1 ? (
              <>
                <Button style={{ marginRight: 10 }}>编辑</Button>
                <Button style={{ marginRight: 10 }} onClick={() => { this.props.accredit(row.id); }}>授权</Button>
                <Button onClick={() => { this.props.handleDelete(row.id); }}>删除</Button>
              </>
            ) : null
          )
        }
      ]
    };
  }

  render() {
    return (
      <Table dataSource={this.props.dataSource} columns={this.state.columns} />
    );
  }
}
