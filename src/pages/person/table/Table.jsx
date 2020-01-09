import React from 'react';
import {
  Table, Button, Avatar, Divider
} from 'antd';

export default class recordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '手机号',
          dataIndex: 'phone',
          key: '2'
        },
        {
          title: '注册照片',
          render: (row) => (
            <Avatar shape="square" size={64} icon="user" src={row.faceUrl} />
          ),
          key: '4'
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
          render: (text, row) => (
            this.props.dataSource.length >= 1 ? (
              <>
                <Button type="primary" onClick={() => { this.props.history.push({ pathname: '/person/addPerson', state: row }); }}>编辑</Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={() => { this.props.accredit(row.id); }}>授权</Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={() => { this.props.detail(row.tag); }}>详情</Button>
                <Divider type="vertical" />
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
      <Table loading={this.props.loading} rowKey="id" pagination={this.props.pagination} dataSource={this.props.dataSource} columns={this.state.columns} />
    );
  }
}
