import React, { Component } from 'react';
import { Button } from 'antd';

class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSecret: false
    };
  }

  render() {
    const { showSecret } = this.state;
    return (
      <div className="application-list">
        <h3 className="application-list--title">测试</h3>
        <div className="application-list-content">
          <div className="application-list-content--item">
            <p>AppId：7B8B850FFB894CE6A4D9AF31B494D345</p>
            <p>AppKey：7B8B850FFB894CE6A4D9AF31B494D345</p>
            <p>AppSecret：
              {
                  !showSecret ? <Button type="link" onClick={() => { this.setState({ showSecret: !showSecret }); }}>显示</Button>
                    : <span>94F6460D57D1470E92C965522827DB11<Button type="link" onClick={() => { this.setState({ showSecret: !showSecret }); }}>隐藏</Button></span>
              }
            </p>
          </div>
          <div className="application-list-content--item">
            <p>创建时间：2019-09-16 14:15:26</p>
            <p>应用状态：审核中</p>
          </div>
          <div className="application-list-content--item">
            <div className="application-list-content--item-text">
              <p>回调名称：</p>
              <p>应用说明：</p>
            </div>
            <div className="application-list-content--item-btn">
              <Button type="primary">编辑</Button>
              <Button>下线</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationList;
