import React, { Component } from 'react';
// import { Button, Icon } from 'antd';
import MyNotice from './notice';
import './index.less';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="callback">
        <MyNotice />
      </div>
    );
  }
}

export default Callback;
