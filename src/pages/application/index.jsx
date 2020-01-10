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
      dataList: [1, 2, 3],
      loading: false
    };
  }

  componentDidMount() {
    // console.log(this.context);
    this.getApplyList();
  }

  // 获取应用列表
  getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      userId: 'ba06ae67-d1df-4434-9d80-65aa441aec03'
    });
    if (res.status === 0) {
      console.log(res.result.list);
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
                  : dataList.map((item, index) => <ApplicationList key={item + index} item={item} />)
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
