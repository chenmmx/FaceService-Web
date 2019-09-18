import React, { Component } from 'react';
import { Input, Tabs, Spin } from 'antd';
import Terminal from './terminal';
import UnboundTerminal from './unboundTerminal';
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
      tabIndex: 'terminal',
      loading: false,
      unboundList: [],
      bindList: []
    };
  }

  componentDidMount() {
    this.setState({
      bindList: [
        {
          id: '12032131',
          terminalName: '123',
          state: '在线',
          warranty: '在保',
          ip: '192.168.1.1',
          version: '1.0.1',
          recongnizeThreshould: '0.57'
        }
      ]
    });
  }

  // Tab切换
  onTabChange = async (key) => {
    this.setState({
      tabIndex: key,
      loading: false
    });
    if (key === 'terminal') {
      await this.getTerminalList();
    } else {
      await this.getUnboundTerminalList();
    }
  }

  // 应用选择
  handleApplicationSelect = (id) => {
    const { tabIndex } = this.state;
    this.setState({
      selectApplicationId: id
    });
    console.log(tabIndex);
  }

  // 获取已绑定终端列表
   getTerminalList = async () => {
     this.setState({
       bindList: [
         {
           id: '12032131',
           terminalName: '123',
           state: '在线',
           warranty: '在保',
           ip: '192.168.1.1',
           version: '1.0.1',
           recongnizeThreshould: '0.57'
         }
       ]
     });
   }

   // 获取未绑定终端列表
   getUnboundTerminalList = async () => {
     this.setState({
       unboundList: [
         {
           id: '12032131',
           terminalName: '123',
           time: '2019-09-17 00:00:00',
           ip: '192.168.1.1'
         }
       ]
     });
   }

   render() {
     const {
       applicationList, selectApplicationId, unboundList, bindList, loading
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
             <Search style={{ margin: '0px 10px', width: 162 }} placeholder="搜索应用" onSearch={(value) => console.log(value)} />
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
             <TabPane tab="赤眸列表" key="terminal">
               <Spin spinning={loading} delay={100}>
                 <Terminal bindList={bindList} />
               </Spin>
             </TabPane>
             <TabPane tab="未绑定赤眸" key="unbound">
               <Spin spinning={loading} delay={100}>
                 <UnboundTerminal unboundList={unboundList} />
               </Spin>
             </TabPane>
           </Tabs>
         </div>
       </div>
     );
   }
}

export default Device;
