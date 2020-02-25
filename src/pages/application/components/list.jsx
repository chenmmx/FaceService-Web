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
      modalType: '',
      applyId: ''
    };
  }


  // 编辑
  onUpdate = (id) => {
    this.setState({
      modalType: 'update',
      modalTitle: '编辑',
      visible: true,
      applyId: id
    });
  }

  // 下线
  onOffline = (id) => {
    this.setState({
      modalType: 'delete',
      modalTitle: '确认提示',
      visible: true,
      applyId: id
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
      showSecret, modalType, modalTitle, applyId
    } = this.state;
    const { item } = this.props;
    return (
      <div className="application-list">
        <h3 className="application-list--title">{item.name}</h3>
        <div className="application-list-content">
          <div className="application-list-content--item">
            <p>appId：{item.id}</p>
            {/* <p>appKey：{item.secret}</p> */}
            <p>appSecret：
              {
                  !showSecret ? <Button type="link" onClick={() => { this.setState({ showSecret: !showSecret }); }}>显示</Button>
                    : <span>{item.secret}<Button type="link" onClick={() => { this.setState({ showSecret: !showSecret }); }}>隐藏</Button></span>
              }
            </p>
          </div>
          <div className="application-list-content--item">
            <p>创建时间：{item.createTime || ''}</p>
            <p>应用状态：已通过</p>
          </div>
          <div className="application-list-content--item">
            <div className="application-list-content--item-text">
              <p>回调名称：</p>
              <p>应用说明：{item.remark}</p>
            </div>
            <div className="application-list-content--item-btn">
              <Button
                type="primary"
                onClick={() => {
                  this.onUpdate(item.id);
                }}
              >编辑
              </Button>
              <Button onClick={() => {
                this.onOffline(item.id);
              }}
              >下线
              </Button>
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
                modalType === 'update' ? <ApplicationUpdateForm applyId={applyId} handleClose={this.handleClose} getApplyList={this.props.getApplyList} /> : <ApplicationDeleteForm applyId={applyId} handleClose={this.handleClose} getApplyList={this.props.getApplyList} />
            }
        </Modal>
      </div>
    );
  }
}

export default ApplicationList;
