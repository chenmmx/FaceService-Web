import React, { Component } from 'react';
import { Button, Icon } from 'antd';

// 底部应用创建
class ApplicationBottom extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  onCreate = () => {
    const { history } = this.props;
    history.push('/application/create');
  }

  render() {
    return (
      <div className="application-bottom">
        <Button type="link" className="application-bottom--add" onClick={this.onCreate}>
          <Icon type="plus-circle" theme="filled" style={{ marginRight: '5px' }} />
                添加新应用
        </Button>
      </div>
    );
  }
}

export default ApplicationBottom;
