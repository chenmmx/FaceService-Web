import React, { Component } from 'react';
import { Button, notification } from 'antd';
import redpupilService from '@/services/redpupil.service';
import './style.less';

class DeviceFormDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleSubmit = async () => {
    const { handleClose, redpupilId, getTerminalList } = this.props;
    let res = await redpupilService.delete([redpupilId]);
    if (res.status === 0) {
      getTerminalList();
      handleClose();
      notification.success({
        message: '成功',
        description: '删除成功'
      });
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { handleClose } = this.props;
    return (
      <div className="device-form-delete">
        <div className="device-form-delete-title">删除后设备需重新绑定，是否确认？</div>
        <div className="device-form-delete-btn">
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>确认</Button>
          <Button onClick={() => { handleClose(); }}>取消</Button>
        </div>
      </div>
    );
  }
}

export default DeviceFormDelete;
