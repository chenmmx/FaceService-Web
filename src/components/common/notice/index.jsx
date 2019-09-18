import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: 'block'
    };
  }

  // 关闭notice
  hideNotice() {
    const show = 'none';
    this.setState({
      isShow: show
    });
  }

  render() {
    const { message } = this.props;
    return (
      <div className="notice" style={{ display: this.state.isShow }}>
        <p>
          {message}
          <Button type="link">查看</Button>
          <Icon type="close" onClick={this.hideNotice.bind(this)} />
        </p>
      </div>
    );
  }
}

Notice.propTypes = {
  message: PropTypes.string.isRequired
};

export default Notice;
