import React, { Component } from 'react';
import {
  Input, DatePicker, Select, Tabs, Spin
} from 'antd';
import './style.less';
import SuccessTable from './table/successTable';
import FailedTable from './table/failedTable';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const { TabPane } = Tabs;

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
      successList: [],
      fieldList: []
    };
  }

  componentDidMount() {
    this.setState({
      successList: [
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
      ]
    });
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

  // 判断是否返回应用信息
  app=() => {
    if (this.state.checkApp.name === '全部') {
      return <></>;
    }
    return (
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
    );
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

  // Tab切换
  onTabChange = async (key) => {
    if (key === 'success') {
      await this.getSuccessList();
    } else {
      await this.getFailedlList();
    }
  }

    // 获取识别成功列表
    getSuccessList = async () => {
      this.setState({
        successList: [
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
        ]
      });
    }

    // 获取识别失败列表
    getFailedlList = async () => {
      this.setState({
        fieldList: [
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
          },
          {
            key: '3',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
          },
          {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
          }
        ]
      });
    }

    render() {
    // 右侧搜索
      const operations = (
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
      );
      return (
        <div id="record" style={{ display: 'flex', minHeight: 857, position: 'relative' }}>
          <div
            className="contentLeft"
            style={{
              padding: '20px 0px', width: 182, backgroundColor: '#F7F7F7'
            }}
          >
            <div>
              <p style={{ fontSize: 12, color: 'black', margin: '0px 12px 10px' }}>请选择应用</p>
              <Search style={{ margin: '0px 10px', width: 162 }} placeholder="搜索应用" onSearch={(value) => console.log(value)} />
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
            <div>
              <Tabs defaultActiveKey="success" onChange={this.onTabChange} tabBarExtraContent={operations}>
                <TabPane tab="识别成功" key="success">
                  <Spin spinning={this.state.loading} delay={100}>
                    {this.app()}
                    <SuccessTable dataSource={this.state.successList} />
                  </Spin>
                </TabPane>
                <TabPane tab="识别失败(陌生人)" key="failed">
                  <Spin spinning={this.state.loading} delay={100}>
                    {this.app()}
                    <FailedTable dataSource={this.state.fieldList} />
                  </Spin>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      );
    }
}

export default Record;
