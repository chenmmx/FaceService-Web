import React, { Component } from 'react';

class DeviceFormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    const { data } = this.props.match.params;
    const { id, ip } = JSON.parse(data);
    console.log('id', id);
    console.log('ip', ip);
  }

  render() {
    return (
      <div className="device-form-add">绑定</div>
    );
  }
}

export default DeviceFormAdd;
