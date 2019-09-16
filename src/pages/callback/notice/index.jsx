import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './index.less';

export default class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: 'block'
    };
  }

  hideNotice() {
    const show = 'none';
    this.setState({
      isShow: show
    });
  }

  render() {
    return (
      <div className="notice" style={{ display: this.state.isShow }}>
        <p>
          温馨提示：注册照片接口新增照片质量检测功能，您可在人员管理模块添加照片进行体验。
          <Button type="link">查看</Button>
          <Icon type="close" onClick={this.hideNotice.bind(this)} />
        </p>
      </div>
    );
  }
}
