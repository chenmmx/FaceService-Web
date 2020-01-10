import React, { Component } from 'react';
import {
  Input, Select, Modal,
  Button
} from 'antd';
import PersonTable from '../table/Table';

const InputGroup = Input.Group;
const { Option } = Select;

class Accredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      deleteModal: false,
      number: 0,
      startValue: null,
      endValue: null,
      open: false,
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        }
      ],
      columns: [
        {
          title: '设别序列号',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '应用名称',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '设备名称',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '版本号',
          dataIndex: 'address',
          key: '2'
        }
      ]
    };
  }

  disabledStartDate = (startValue) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  enter=() => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }

  leave=() => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }

  handleAccredit() {
    this.setState({
      deleteModal: true
    });
  }

  // 弹框取消
  handleCancel() {
    this.setState({
      deleteModal: false
    });
  }

  // 弹框确认
  handleOk() {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        deleteModal: false,
        confirmLoading: false
      });
    }, 2000);
  }

  render() {
    return (
      <div id="person" style={{ display: 'flex', minHeight: 857, position: 'relative' }}>
        <div className="contentRight" style={{ marginLeft: 20, flexGrow: 2, marginRight: 20 }}>
          <div
            className="contentRight-title"
            style={{
              fontSize: 16,
              paddingLeft: 10,
              borderLeft: '3px solid #0F9EE9',
              marginTop: 20,
              minWidth: 700,
              marginBottom: 20
            }}
          >人员管理
          </div>
          <div style={{ marginBottom: 20 }}>人员授权({this.state.number})</div>
          <div
            className="appName"
            style={{
              backgroundColor: '#e1e7ec', padding: 20, marginBottom: 20
            }}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ width: 400 }}>人员姓名:</div>
              <div style={{ flexGrow: 3 }}>Guid:</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 400 }}>应用名:</div>
              <div style={{ flexGrow: 3 }}>Guid:</div>
            </div>
          </div>
          <div
            className="contentRight-search"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20
            }}
          >
            <div>
              <div>
                <span>选择需要授权的设备:</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputGroup compact style={{ marginLeft: 20 }}>
                <Select style={{ width: 120 }} defaultValue="设别序列号" onMouseEnter={this.enter} onSelect={this.leave} open={this.state.open}>
                  <Option value="设备序列号">设备序列号</Option>
                  <Option value="设备名称">设备名称</Option>
                </Select>
                <Input style={{ width: 200 }} defaultValue="请输入对应搜索条件" />
              </InputGroup>
              <Button style={{ marginLeft: 20 }} icon="safety-certificate" onClick={this.handleAccredit.bind(this)}>全部授权</Button>
            </div>
          </div>
          <div><PersonTable pagination={{ position: 'top' }} dataSource={this.state.dataSource} columns={this.state.columns} /></div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button type="primary" onClick={this.handleAccredit.bind(this)}>确认</Button>
            <Button style={{ marginLeft: 20 }} onClick={() => { this.props.history.push('/person'); }}>取消</Button>
          </div>
        </div>
        {/* 删除提示框 */}
        <Modal
          title="提示"
          centered
          visible={this.state.deleteModal}
          onOk={this.handleOk.bind(this)}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>操作无效，请进行授权或销权的操作。</p>
        </Modal>
      </div>
    );
  }
}

export default Accredit;
