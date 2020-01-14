import React, { Component } from 'react';
import { Input, Tabs } from 'antd';
import Terminal from './terminal';
import Camera from './camera';
import Node from './node';
import './style.less';

const { Search } = Input;
const { TabPane } = Tabs;

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationList: [
        { id: 123, name: '测试' }
      ],
      selectApplicationId: '',
      tabIndex: 'terminal'
    };
    // this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (value) => {
    console.log(value);
  }

  // Tab切换
  onTabChange = async (key) => {
    this.setState({
      tabIndex: key
    });
  }

  // 应用选择
  handleApplicationSelect = (id) => {
    const { tabIndex } = this.state;
    this.setState({
      selectApplicationId: id
    });
    console.log(tabIndex);
  }


  render() {
    const {
      applicationList, selectApplicationId
    } = this.state;
    return (
      <div id="device" style={{ display: 'flex', minHeight: 857, position: 'relative' }}>
        <div
          className="content-left"
          style={{
            padding: '20px 0px', width: this.state.width, backgroundColor: '#F7F7F7'
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: 'black', margin: '0px 12px 10px' }}>请选择应用</p>
            <Search style={{ margin: '0px 10px', width: 162 }} placeholder="搜索应用" onSearch={this.handleSearch} />
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
              <Terminal />
            </TabPane>
            <TabPane tab="摄像机" key="camera">
              <Camera />
            </TabPane>
            <TabPane tab="节点" key="node">
              <Node />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Device;
