import React, { Component } from 'react';
import {
  Input, DatePicker, Select, Tabs, Spin, notification, Modal, Button
} from 'antd';
import './style.less';
import SuccessTable from './table/successTable';
import FailedTable from './table/failedTable';
import recordService from '@/services/record.service';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const { TabPane } = Tabs;

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordId: '',
      visible: false,
      key: 'success',
      pagination: {
        current: 1,
        pageSize: 10,
        onChange: this.onIndexChange,
        total: 0
      },
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
    this.getSuccessList();
  }

  // 页码改变
  onIndexChange = (val) => {
    this.setState((state) => {
      state.pagination.current = val;
      return {
        pagination: state.pagination
      };
    }, () => {
      if (this.state.key === 'success') {
        this.getSuccessList();
      } else {
        this.getFailedlList();
      }
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
          <div style={{ flexGrow: 2 }}>appid:{this.state.checkApp.appid}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 400 }}>应用钩子:{this.state.checkApp.check}</div>
        </div>
      </div>
    );
  }

  // 选择应用
  chooseApply = (e) => {
    const { list } = this.state;
    const a = list.filter((item) => item.name === e.target.innerText);
    this.setState({
      siderStyle: e.target.innerText,
      checkApp: a[0]
    });
  }

  // Tab切换
  onTabChange = (key) => {
    this.setState((state) => {
      state.pagination.current = 1;
      state.pagination.pageSize = 10;
      return {
        recordId: '',
        visible: false,
        pagination: state.pagination,
        key
      };
    }, () => {
      if (key === 'success') {
        this.getSuccessList();
      } else {
        this.getFailedlList();
      }
    });
  }

  // 删除赤眸记录
  redpupilHandleDelete = (val) => {
    this.setState({
      visible: true,
      recordId: val
    });
  }

  // 获取赤眸识别列表
  getSuccessList = async () => {
    this.setState({
      loading: true
    });
    const { current, pageSize } = this.state.pagination;
    let res = await recordService.getListByPageRedpupil({ pageIndex: current, pageSize, applyId: '7551f009-d4b2-4afd-bab5-782dd0521050' });
    if (res.status === 0) {
      this.setState((state) => {
        state.pagination.total = res.result.total;
        return {
          pagination: state.pagination,
          successList: res.result.list,
          loading: false
        };
      });
    } else {
      notification.error({
        message: '错误',
        description: res.errorMsg
      });
    }
  }

  // 删除摄像机记录
  cameraHandleDelete = (val) => {
    this.setState({
      visible: true,
      recordId: val
    });
  }

  // 获取摄像机识别列表
  getFailedlList = async () => {
    this.setState({
      loading: true
    });
    const { current, pageSize } = this.state.pagination;
    let res = await recordService.getListByPageCamera({ pageIndex: current, pageSize, applyId: '7551f009-d4b2-4afd-bab5-782dd0521050' });
    if (res.status === 0) {
      this.setState((state) => {
        state.pagination.total = res.result.total;
        return {
          pagination: state.pagination,
          fieldList: res.result.list,
          loading: false
        };
      });
    } else {
      notification.error({
        message: '错误',
        description: res.errorMsg
      });
    }
  }

  // 确认删除
  onSubmit = async () => {
    if (this.state.key === 'success') {
      let res = await recordService.deleteRedpupil([this.state.recordId]);
      if (res.status === 0) {
        notification.success({
          message: '成功',
          description: '删除成功'
        });
        this.setState({
          visible: false,
          recordId: ''
        }, () => { this.getSuccessList(); });
      } else {
        notification.error({
          message: '错误',
          description: res.errorMsg
        });
        this.setState({
          visible: false,
          recordId: ''
        });
      }
    } else {
      let res = await recordService.deleteCamera([this.state.recordId]);
      if (res.status === 0) {
        notification.success({
          message: '成功',
          description: '删除成功'
        });
        this.setState({
          visible: false,
          recordId: ''
        }, () => { this.getFailedlList(); });
      } else {
        notification.error({
          message: '错误',
          description: res.errorMsg
        });
        this.setState({
          visible: false,
          recordId: ''
        });
      }
    }
  }

  // 时间格式化
  formateDate=(val) => {
    if (val) {
      let oDate = new Date(val);
      let oYear = oDate.getFullYear();
      let oMonth = oDate.getMonth() + 1;
      let oDay = oDate.getDate();
      let oHour = oDate.getHours();
      let oMin = oDate.getMinutes();
      let oSen = oDate.getSeconds();
      if (oMonth < 10) {
        oMonth = `0${oMonth}`;
      }
      if (oDay < 10) {
        oDay = `0${oDay}`;
      }
      if (oHour < 10) {
        oHour = `0${oHour}`;
      }
      if (oMin < 10) {
        oMin = `0${oMin}`;
      }
      if (oSen < 10) {
        oSen = `0${oSen}`;
      }
      let oTime = `${oYear}-${oMonth}-${oDay} ${oHour}:${oMin}:${oSen}`;
      return oTime;
    }
    return '';
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
            {this.app()}
            <Tabs defaultActiveKey="success" onChange={this.onTabChange} tabBarExtraContent={operations}>
              <TabPane tab="赤眸记录" key="success">
                <Spin spinning={this.state.loading} delay={200}>
                  <SuccessTable formateDate={this.formateDate} redpupilHandleDelete={this.redpupilHandleDelete} dataSource={this.state.successList} pagination={this.state.pagination} />
                </Spin>
              </TabPane>
              <TabPane tab="摄像机记录" key="failed">
                <Spin spinning={this.state.loading} delay={2000}>
                  <FailedTable formateDate={this.formateDate} cameraHandleDelete={this.cameraHandleDelete} dataSource={this.state.fieldList} pagination={this.state.pagination} />
                </Spin>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <Modal
          title="删除"
          visible={this.state.visible}
          footer={null}
          closable={false}
          className="account-form"
        >
          <div className="account-form-delete">
            <div className="account-form-delete-title">确认删除当前选中记录？</div>
            <div className="account-form-delete-btn">
              <Button type="primary" onClick={this.onSubmit}>确认</Button>
              <Button onClick={() => { this.setState({ visible: false }); }}>取消</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Record;
