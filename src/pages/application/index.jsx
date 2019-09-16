import React, { Component } from 'react';
import FsTitle from '../../components/common/fs-title';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   dataList: []
    };
  }


  render() {
    // const { dataList } = this.state;
    return (
      <div id="application">
        <FsTitle title="应用管理" />
        <div className="application-content">
          <div className="application-content-create">
            <div className="application-content-create--title">您还没有创建应用，立即开始</div>
            <div className="application-content-create--add">1232</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Application;
