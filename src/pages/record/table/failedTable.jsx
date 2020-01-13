import React from 'react';
import {
  Table, Avatar, Divider, Button
} from 'antd';

export default class failedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '人脸抓拍',
          render: (row) => (
            <div>
              <Avatar shape="square" size={64} icon="user" src={row.sourceUrl} />
              <Divider type="vertical" />
              <Avatar shape="square" size={64} icon="user" src={row.faceUrl} />
            </div>
          ),
          key: '4'
        },
        {
          title: '相似度',
          dataIndex: 'similarity',
          key: '2'
        },
        {
          title: '设备名称',
          dataIndex: 'cameraName',
          key: 'name'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: '1'
        },
        {
          title: '识别时间',
          dataIndex: 'recordTime',
          render: (text, row) => (
            <>
              {this.props.formateDate(row.recordTime)}
            </>
          ),
          key: '3'
        },
        {
          title: '操作',
          key: '5',
          render: (text, row) => (
            <>
              <Button onClick={() => { this.props.cameraHandleDelete(row.id); }}>删除</Button>
            </>
          )
        }
      ]
    };
  }

  render() {
    return (
      <Table rowKey="id" pagination={this.props.pagination} dataSource={this.props.dataSource} columns={this.state.columns} />
    );
  }
}
