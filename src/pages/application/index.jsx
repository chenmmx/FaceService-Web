import React, { Component } from 'react';
import { Spin } from 'antd';
import FsTitle from '../../components/common/fs-title';
import ApplicationCreate from './components/create';
import ApplicationList from './components/list';
import ApplicationBottom from './components/bottom';
import applyService from '@/services/apply.service';
import './style.less';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      loading: false
    };
  }

  componentDidMount() {
    // console.log(this.context);
    this.getApplyList();
  }

  // 获取应用列表
  getApplyList = async () => {
    this.setState({
      loading: true
    });
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      console.log(res.result.list);
      this.setState({
        dataList: res.result.list,
        loading: false
      });
    }
  }

  render() {
    const { dataList, loading } = this.state;
    const { history } = this.props;
    return (
      <div id="application">
        <FsTitle title="应用管理" />
        <Spin spinning={loading}>
          {
                dataList.length === 0
                  ? <ApplicationCreate history={history} />
                  : dataList.map((item, index) => <ApplicationList key={item + index} item={item} getApplyList={this.getApplyList} />)
            }
          {
                dataList.length === 0 ? null : <ApplicationBottom history={history} />
            }
        </Spin>
      </div>
    );
  }
}

export default Application;
