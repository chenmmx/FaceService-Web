import React, { Component } from 'react';
import { Spin } from 'antd';
import FsTitle from '../../components/common/fs-title';
import ApplicationCreate from './components/create';
import ApplicationList from './components/list';
import ApplicationBottom from './components/bottom';
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
                  : dataList.map((item, index) => <ApplicationList key={item + index} />)
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
