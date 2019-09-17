import React, { Component } from 'react';
import {
  Input, Button, DatePicker, Select
} from 'antd';
import './style.less';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      open: false,
      rightSure: true
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

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
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

  render() {
    return (
      <div style={{ display: 'flex', minHeight: 857, position: 'relative' }}>
        <div
          className="contentLeft"
          style={{
            padding: '20px 0px', width: this.state.width, transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', backgroundColor: '#E1E7EC'
          }}
        >
          {this.state.rightSure === true ? (
            <div><Button
              style={{ position: 'absolute', top: 10, left: 121 }}
              size="small"
              icon="backward"
              onClick={() => {
                const { rightSure } = this.state; this.setState(
                  {
                    rightSure: !rightSure,
                    width: 40
                  }
                );
              }}
            />
              <p style={{ fontSize: 12, color: 'black', margin: '0px 10px' }}>请选择应用</p>
              <Search style={{ margin: '0px 10px', width: 125 }} placeholder="搜索应用" onSearch={(value) => console.log(value)} />
              <ul style={{ marginTop: 10, listStyle: 'none' }}>
                <li style={{
                  backgroundColor: '#fff', textAlign: 'center', padding: 10, cursor: 'pointer', color: '#0F9EE9'
                }}
                >全部
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Button
                style={{ position: 'absolute', top: 10, left: 16 }}
                size="small"
                icon="forward"
                onClick={() => {
                  const { rightSure } = this.state; this.setState(
                    {
                      rightSure: !rightSure,
                      width: 145
                    }
                  );
                }}
              />
            </div>
          )}
        </div>
        <div className="contentRight" style={{ marginLeft: 20, flexGrow: 2 }}>
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
          >识别记录管理
          </div>
          <div className="contentRight-search" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <ul className="underline-navbar">
                <li>识别成功</li>
                <li>识别失败(陌生人)</li>
              </ul>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DatePicker
                disabledDate={this.disabledStartDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={this.state.startValue}
                placeholder="Start"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />-
              <DatePicker
                disabledDate={this.disabledEndDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={this.state.endValue}
                placeholder="End"
                onChange={this.onEndChange}
                open={this.state.endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
              <InputGroup compact style={{ marginLeft: 20 }}>
                <Select style={{ width: 120 }} defaultValue="设备序列号" onMouseEnter={this.enter} onSelect={this.leave} open={this.state.open}>
                  <Option value="设备序列号">设备序列号</Option>
                  <Option value="设备名称">设备名称</Option>
                  <Option value="姓名">姓名</Option>
                  <Option value="guid">guid</Option>
                </Select>
                <Input style={{ width: 200 }} defaultValue="请输入对应搜索条件" />
              </InputGroup>
            </div>
          </div>
          <div>content</div>
        </div>
      </div>
    );
  }
}

export default Record;
