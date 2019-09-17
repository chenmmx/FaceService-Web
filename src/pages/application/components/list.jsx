import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import ApplicationUpdateForm from '../form/update';
import ApplicationDeleteForm from '../form/delete';

class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSecret: false,
      visible: false,
      modalTitle: '',
      modalType: ''
    };
  }


  // 编辑
  onUpdate = () => {
    this.setState({
      modalType: 'update',
      modalTitle: '编辑',
      visible: true
    });
  }

  // 下线
  onOffline = () => {
    this.setState({
      modalType: 'delete',
      modalTitle: '确认提示',
      visible: true
    });
  }

  // 弹框确认
  handleClose = () => {
    this.setState({
      visible: false
    });
  }

  // 弹框取消
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    const {
      showSecret, modalType, modalTitle
    } = this.state;
    return (
      <div className="application-list">
        <h3 className="application-list--title">测试</h3>
        <div className="application-list-content">
          <div className="application-list-content--item">
            <p>appId：7B8B850FFB894CE6A4D9AF31B494D345</p>
            <p>appKey：7B8B850FFB894CE6A4D9AF31B494D345</p>
            <p>appSecret：
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
              <Button type="primary" onClick={this.onUpdate}>编辑</Button>
              <Button onClick={this.onOffline}>下线</Button>
            </div>
          </div>
        </div>
        <Modal
          title={modalTitle}
          visible={this.state.visible}
          footer={null}
          closable={false}
        >
          {
                modalType === 'update' ? <ApplicationUpdateForm handleClose={this.handleClose} /> : <ApplicationDeleteForm handleClose={this.handleClose} />
            }
        </Modal>
      </div>
    );
  }
}

export default ApplicationList;
