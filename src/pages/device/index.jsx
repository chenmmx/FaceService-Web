import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Tabs } from 'antd';
import Terminal from './terminal';
import Camera from './camera';
import Node from './node';
import * as redpupilActionTypes from '@/store/actions/redpupil';
import * as cameraActionTypes from '@/store/actions/camera';
import * as nodeActionTypes from '@/store/actions/node';
import applyService from '@/services/apply.service';
import './style.less';

const { Search } = Input;
const { TabPane } = Tabs;

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationList: [],
      selectApplicationId: '',
      tabIndex: 'terminal',
      searchValue: ''
    };
    // this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.getApplyList();
    this.handleSearch();
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
        applicationList: res.result.list
      });
    }
  }

  // 搜索
  handleSearch = (value) => {
    const { getRedpupilListDispatch, getCameraListDispatch, getNodeListDispatch } = this.props;
    this.setState({
      searchValue: value
    });
    const { tabIndex, selectApplicationId } = this.state;
    switch (tabIndex) {
      case 'terminal':
        getRedpupilListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: value,
          applyId: selectApplicationId
        });
        break;
      case 'camera':
        getCameraListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: value,
          applyId: selectApplicationId
        });
        break;
      case 'node':
        getNodeListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: value,
          applyId: selectApplicationId
        });
        break;
      default: console.log('error');
    }
  }


  // Tab切换
  onTabChange = async (key) => {
    const { getRedpupilListDispatch, getCameraListDispatch, getNodeListDispatch } = this.props;
    this.setState({
      tabIndex: key
    });
    const { selectApplicationId } = this.state;
    switch (key) {
      case 'terminal':
        getRedpupilListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: '',
          applyId: selectApplicationId
        });
        break;
      case 'camera':
        getCameraListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: '',
          applyId: selectApplicationId
        });
        break;
      case 'node':
        getNodeListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: '',
          applyId: selectApplicationId
        });
        break;
      default: console.log('error');
    }
  }

  // 应用选择
  handleApplicationSelect = (id) => {
    const { getRedpupilListDispatch, getCameraListDispatch, getNodeListDispatch } = this.props;
    const { tabIndex, searchValue } = this.state;
    this.setState({
      selectApplicationId: id
    });
    switch (tabIndex) {
      case 'terminal':
        getRedpupilListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: searchValue,
          applyId: id
        });
        break;
      case 'camera':
        getCameraListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: searchValue,
          applyId: id
        });
        break;
      case 'node':
        getNodeListDispatch({
          pageIndex: 1,
          pageSize: 10,
          name: searchValue,
          applyId: id
        });
        break;
      default: console.log('error');
    }
  }


  render() {
    const {
      applicationList, selectApplicationId
    } = this.state;
    return (
      <div id="device" style={{ display: 'flex', minHeight: 807, position: 'relative' }}>
        <div
          className="content-left"
          style={{
            padding: '20px 0px', width: this.state.width, backgroundColor: '#F7F7F7'
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: 'black', margin: '0px 12px 10px' }}>请选择应用</p>
            <Search style={{ margin: '0px 10px', width: 162 }} placeholder="搜索设备" onSearch={this.handleSearch} />
            <ul className="content-left-list">
              <li className={`content-left-list-item ${selectApplicationId === '' ? 'active' : ''}`} onClick={this.handleApplicationSelect.bind(this, '')}>
                全部
              </li>
              {
                    applicationList.map((item) => (
                      <li className={`content-left-list-item ${selectApplicationId === item.id ? 'active' : ''}`} key={item.id} onClick={this.handleApplicationSelect.bind(this, item.id)}>
                        {item.name}
                      </li>
                    ))
                }
            </ul>
          </div>
        </div>
        <div className="content-right">
          <Tabs defaultActiveKey="terminal" onChange={this.onTabChange}>
            <TabPane tab="赤眸" key="terminal">
              <Terminal selectApplicationId={selectApplicationId} />
            </TabPane>
            <TabPane tab="摄像机" key="camera">
              <Camera selectApplicationId={selectApplicationId} />
            </TabPane>
            <TabPane tab="节点" key="node">
              <Node selectApplicationId={selectApplicationId} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  // 获取赤眸列表
  getRedpupilListDispatch: (formData) => {
    dispatch(redpupilActionTypes.getRedpupilList(formData));
  },
  // 获取摄像机列表
  getCameraListDispatch: (formData) => {
    dispatch(cameraActionTypes.getCameraList(formData));
  },
  // 获取节点列表
  getNodeListDispatch: (formData) => {
    dispatch(nodeActionTypes.getNodeList(formData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Device);
