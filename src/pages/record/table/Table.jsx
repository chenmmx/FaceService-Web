import React from 'react';
import { Table } from 'antd';

export default class recordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Table dataSource={this.props.dataSource} columns={this.props.columns} />
    );
  }
}
