import React, { Component } from 'react';
import { Icon, Button } from 'antd';

class ApplicationCreate extends Component {
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
      <div className="application-create">
        <div className="application-create--title">您还没有创建应用，立即开始</div>
        <div className="application-create-add">
          <Button type="link" className="application-create-add--text" onClick={this.onCreate}>
            <Icon type="plus-circle" theme="filled" style={{ marginRight: '5px' }} />
                创建应用
          </Button>
        </div>
      </div>
    );
  }
}

export default ApplicationCreate;
