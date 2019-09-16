import React, { Component } from 'react';
import { Input, Button, DatePicker } from 'antd';
import './style.less';

const { Search } = Input;

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightSure: true,
      width: 145
    };
  }

  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk(value) {
    console.log('onOk: ', value);
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
            <div>
              <DatePicker showTime placeholder="Select Time" onChange={this.onChange} onOk={this.onOk} />
            </div>
          </div>
          <div>content</div>
        </div>
      </div>
    );
  }
}

export default Record;
