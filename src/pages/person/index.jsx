import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Input, DatePicker, Select, Modal, notification
} from 'antd';
import './style.less';
import PersonTable from './table/Table';
import personService from '@/services/person.service';
import applyService from '@/services/apply.service';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      applyId: '',
      pagination: {
        current: 1,
        pageSize: 10,
        onChange: this.onIndexChange,
        total: 0
      },
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
      dataSource: [],
      id: ''
    };
  }

  componentDidMount() {
    this.getApplyList();
    this.getList();
  }

  // 获取应用列表
  getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      console.log(res.result.list);
      this.setState({
        list: [{ name: '全部', id: '' }, ...res.result.list]
      });
    }
  }

  // 页码改变
  onIndexChange=(val) => {
    this.setState((state) => {
      state.pagination.current = val;
      return {
        pagination: state.pagination
      };
    }, () => {
      this.getList();
    });
  }

  // 获取列表
  getList = async () => {
    this.setState({
      loading: true
    });
    const { current, pageSize } = this.state.pagination;
    const res = await personService.getListByPage({ pageIndex: current, pageSize, applyId: this.state.applyId });
    if (res.status === 0) {
      this.setState((state) => {
        state.pagination.total = res.result.total;
        return {
          pagination: state.pagination,
          dataSource: res.result.list,
          loading: false
        };
      });
    } else {
      notification.error({
        message: '错误',
        description: res.errorMsg
      });
    }
  };

  detail = (val) => {
    if (val) {
      const data = JSON.parse(val);
      Modal.info({
        title: '详情',
        content: (
          <div>
            <p>应用名称:{data.name}</p>
            <p>姓名:{data.personName}</p>
            <p>卡号:{data.idNo}</p>
            <p>身份证号:{data.idNumber}</p>
            <p>人员类型:{data.personType}</p>
          </div>
        ),
        onOk() { }
      });
    } else {
      Modal.error({
        title: '暂无相关信息'
      });
    }
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

  enter = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }

  leave = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }

  // 选择应用
  chooseApply = (e) => {
    const { list } = this.state;
    const a = list.filter((item) => item.name === e.target.innerText);
    console.log(a[0]);
    this.setState({
      siderStyle: e.target.innerText,
      checkApp: a[0]
    });
    this.setState((state) => {
      state.applyId = a[0].id;
    }, () => {
      this.getList();
    });
  }

  // 判断是否返回应用信息
  app = () => {
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

  // 授权
  accredit = (id) => {
    console.log(this.props, id);
    this.props.history.push(`/person/accredit/${id}`);
  }

  // 删除
  handleDelete = (id) => {
    this.setState({
      deleteModal: true,
      id
    });
  }

  // 弹框确认删除
  handleOk = async () => {
    this.setState({
      confirmLoading: true
    });
    if (this.state.dataSource.length <= 1 && this.state.pagination.current > 1) {
      this.setState((state) => {
        const current = state.pagination.current - 1;
        state.pagination.current = current;
        return {
          pagination: state.pagination
        };
      });
    }
    const res = await personService.delete([this.state.id]);
    if (res.status === 0) {
      notification.success({
        message: '成功',
        description: '删除成功'
      });
      this.setState({
        deleteModal: false,
        confirmLoading: false
      });
      this.getList();
    } else {
      notification.error({
        message: '错误',
        description: res.errorMsg
      });
      this.setState({
        deleteModal: false,
        confirmLoading: false
      });
    }
  }

  // 弹框取消
  handleCancel() {
    this.setState({
      deleteModal: false
    });
  }

  render() {
    return (
      <div id="person" style={{ display: 'flex', minHeight: 857, position: 'relative' }}>
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
                <span>人员
                  <span style={{ color: '#0099ff' }}>{this.state.pagination.total}</span>
                </span>
                <Link type="primary" to="/person/addPerson" className="addPeron">添加人员</Link>
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
          {this.app()}
          <div><PersonTable history={this.props.history} detail={this.detail} loading={this.state.loading} pagination={this.state.pagination} handleDelete={this.handleDelete} accredit={this.accredit} dataSource={this.state.dataSource} /></div>
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
