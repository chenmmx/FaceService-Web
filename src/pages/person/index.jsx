import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Input, DatePicker, Select
} from 'antd';
import './style.less';
import PersonTable from './table/Table';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          title: '人员类型',
          dataIndex: 'address',
          key: '1'
        },
        {
          title: '卡号(idNo)',
          dataIndex: 'address',
          key: '2'
        },
        {
          title: '创建时间',
          dataIndex: 'address',
          key: '3'
        },
        {
          title: '注册照片',
          dataIndex: 'address',
          key: '4'
        },
        {
          title: '照片授权状态',
          dataIndex: 'address',
          key: '5'
        },
        {
          title: '操作',
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

  render() {
    return (
      <div style={{ display: 'flex', minHeight: 857, position: 'relative' }}>
        <div
          className="contentLeft"
          style={{
            padding: '20px 0px', width: this.state.width, transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', backgroundColor: '#E1E7EC'
          }}
        >
          <div>
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
          >人员管理
          </div>
          <div
            className="contentRight-search"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20
            }}
          >
            <div>
              <div>
                <span>人员(0)</span>
                <Link to="/person/addPerson" className="addPeron">添加人员</Link>
              </div>
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
                <Select style={{ width: 120 }} defaultValue="姓名" onMouseEnter={this.enter} onSelect={this.leave} open={this.state.open}>
                  <Option value="姓名">姓名</Option>
                  <Option value="guid">guid</Option>
                  <Option value="卡号">卡号</Option>
                  <Option value="人员类型">人员类型</Option>
                </Select>
                <Input style={{ width: 200 }} defaultValue="请输入对应搜索条件" />
              </InputGroup>
            </div>
          </div>
          <div><PersonTable dataSource={this.state.dataSource} columns={this.state.columns} /></div>
        </div>
      </div>
    );
  }
}

export default Person;
