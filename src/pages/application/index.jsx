import React, { Component } from 'react';
import { Button } from 'antd';
import FsTitle from '../../components/common/fs-title';
import ApplicationList from './components/list';
import applyService from '@/services/apply.service';
import './style.less';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      total: 0,
      pageIndex: 1
    };
  }

  componentDidMount() {
    // this.getApplyList();
  }

  // 获取应用列表
  getApplyList = async () => {
    const { pageIndex } = this.state;
    let res = await applyService.getListByPage({
      pageIndex,
      pageSize: 10,
      name: ''
    });
    if (res.status === 0) {
      this.setState({
        dataList: res.result.list,
        total: res.result.total
      });
    }
  }

  async handlePageChange(pageIndex) {
    const that = this;
    this.setState({
      pageIndex
    }, () => {
      that.getApplyList();
    });
  }

  render() {
    const { dataList, total } = this.state;
    return (
      <div id="application">
        <FsTitle title="应用管理" />
        <Button
          style={{ marginLeft: '25px' }}
          type="primary"
          onClick={() => {
            const { history } = this.props;
            history.push('/application/create');
          }}
        >新增
        </Button>
        <ApplicationList dataList={dataList} getApplyList={this.getApplyList} handlePageChange={this.handlePageChange} total={total} />
      </div>
    );
  }
}

export default Application;
