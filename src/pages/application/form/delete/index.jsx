import React, { Component } from 'react';
import { Button, notification } from 'antd';
import './style.less';

class ApplicationDeleteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = () => {
    const { handleClose } = this.props;
    notification.success({
      message: '成功',
      description: '下线成功'
    });
    handleClose();
  }

  render() {
    const { loading } = this.state;
    const { handleClose } = this.props;
    return (
      <div className="application-form-delete">
        <div className="application-form-delete-title">下线后，该appId将无法使用接口，是否确认？</div>
        <div className="application-form-delete-btn">
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>确认</Button>
          <Button onClick={() => { handleClose(); }}>取消</Button>
        </div>
      </div>
    );
  }
}

export default ApplicationDeleteForm;
