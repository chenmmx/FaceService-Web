import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class DeviceFormUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    const data = this.props.match;
    console.log(data);
  }

  render() {
    return (
      <div>编辑</div>
    );
  }
}

export default withRouter(DeviceFormUpdate);
