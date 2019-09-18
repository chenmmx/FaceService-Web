import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Input, DatePicker, Select, Modal,
  Button
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
      confirmLoading: false,
      deleteModal: false,
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
          address: '西湖区湖底公园1号',
          id: 123
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
          id: 13
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
          key: 'address',
          render: (text, row) => (
            this.state.dataSource.length >= 1 ? (
              <>
                <Button style={{ marginRight: 10 }}>编辑</Button>
                <Button style={{ marginRight: 10 }} onClick={this.accredit.bind(this, row.id)}>授权</Button>
                <Button onClick={this.handleDelete.bind(this, row.id)}>删除</Button>
              </>
            ) : null
          )
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

  // 选择应用
  chooseApply=(e) => {
    const { list } = this.state;
    const a = list.filter((item) => item.name === e.target.innerText);
    this.setState({
      siderStyle: e.target.innerText,
      checkApp: a[0]
    });
  }

  accredit(id) {
    console.log(this.props, id);
    this.props.history.push(`/person/accredit/${id}`);
  }

  // 删除行
  handleDelete(id) {
    this.setState({
      deleteModal: true
    });
    console.log(id);
  }

  // 弹框取消
  handleCancel() {
    this.setState({
      deleteModal: false
    });
  }

  // 弹框确认删除
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
        <div
          className="contentLeft"
          style={{
            padding: '20px 0px', width: this.state.width, transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', backgroundColor: '#E1E7EC'
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
                <div style={{ width: 400 }}>应用状态:{this.state.checkApp.check}</div>
                <div style={{ flexGrow: 3 }}>应用回调:{this.state.checkApp.appid}</div>
              </div>
            </div>
          )}
          <div><PersonTable dataSource={this.state.dataSource} columns={this.state.columns} /></div>
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
          <p>删除后人员数据信息不可恢复，是否删除？</p>
        </Modal>
      </div>
    );
  }
}

export default Person;
