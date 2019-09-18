import React, { Component } from 'react';
import {
  Input, DatePicker, Select
} from 'antd';
import './style.less';
import RecordTable from './table/Table';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { name: '全部' },
        { name: 'xx', appid: '4ABB802B0769438DA04EB1A3D616B035', check: '/' }
      ],
      siderStyle: '全部',
      checkApp: { name: '全部' },
      startValue: null,
      endValue: null,
      endOpen: false,
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
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'guid',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '应用名称',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '设备序列号',
          dataIndex: 'address',
          key: '2'
        },
        {
          title: '设备名称',
          dataIndex: 'address',
          key: '3'
        },
        {
          title: '识别模式',
          dataIndex: 'address',
          key: '4'
        },
        {
          title: '识别时间',
          dataIndex: 'address',
          key: '5'
        },
        {
          title: '人脸抓拍',
          dataIndex: 'address',
          key: 'address'
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

  // 识别成功
  success=() => {
    this.setState({
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'guid',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '应用名称',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '设备序列号',
          dataIndex: 'address',
          key: '2'
        },
        {
          title: '设备名称',
          dataIndex: 'address',
          key: '3'
        },
        {
          title: '识别模式',
          dataIndex: 'address',
          key: '4'
        },
        {
          title: '识别时间',
          dataIndex: 'address',
          key: '5'
        },
        {
          title: '人脸抓拍',
          dataIndex: 'address',
          key: 'address'
        }
      ]
    });
  }

  // 识别失败
  loser=() => {
    this.setState({
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '设备序列号',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '设备名称',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '识别模式',
          dataIndex: 'address',
          key: '2'
        },
        {
          title: '识别时间',
          dataIndex: 'address',
          key: '3'
        },
        {
          title: '人脸抓拍',
          dataIndex: 'address',
          key: '4'
        }
      ]
    });
  }

  // 选择应用
  chooseApply=(e) => {
    const { list } = this.state;
    const a = list.filter((item) => item.name === e.target.innerText);
    this.setState({
      siderStyle: e.target.innerText,
      checkApp: a[0]
    });
  }

  render() {
    return (
      <div id="record" style={{ display: 'flex', minHeight: 857, position: 'relative' }}>
        <div
          className="contentLeft"
          style={{
            padding: '20px 0px', width: 145, backgroundColor: '#E1E7EC'
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: 'black', margin: '0px 10px' }}>请选择应用</p>
            <Search style={{ margin: '0px 10px', width: 125 }} placeholder="搜索应用" onSearch={(value) => console.log(value)} />
            <ul style={{ marginTop: 10, listStyle: 'none' }} onClick={this.chooseApply}>
              {this.state.list.map((item, index) => (
                <li
                  key={index}
                  style={this.state.siderStyle === item.name ? {
                    backgroundColor: '#fff', textAlign: 'center', padding: 10, cursor: 'pointer', color: '#0F9EE9'
                  } : {
                    textAlign: 'center', padding: 10, cursor: 'pointer', color: 'black'
                  }}
                >{item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
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
          >识别记录管理
          </div>
          <div
            className="contentRight-search"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20
            }}
          >
            <div style={{ height: 30 }}>
              <ul className="underline-navbar">
                <li onClick={this.success}>识别成功</li>
                <li onClick={this.loser}>识别失败(陌生人)</li>
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
          {this.state.checkApp.name === '全部' ? '' : (
            <div
              className="appName"
              style={{
                backgroundColor: '#e1e7ec', padding: 20, marginBottom: 20
              }}
            >
              <div style={{ display: 'flex' }}>
                <div style={{ width: 400 }}>应用名:{this.state.checkApp.name}</div>
                <div style={{ flexGrow: 3 }}>appid:{this.state.checkApp.appid}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 400 }}>应用钩子:{this.state.checkApp.check}</div>
              </div>
            </div>
          )}
          <div><RecordTable dataSource={this.state.dataSource} columns={this.state.columns} /></div>
        </div>
      </div>
    );
  }
}

export default Record;
