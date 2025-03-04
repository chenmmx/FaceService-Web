import React, { Component } from 'react';
import { PageHeader } from 'antd';
import PropTypes from 'prop-types';
import './style.less';

class FsTitle extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { title } = this.props;
    return (
      <div className="fs-title">
        <PageHeader className="herad" title={title} subTitle="" />
      </div>
    );
  }
}

FsTitle.propTypes = {
  title: PropTypes.string.isRequired
};


export default FsTitle;
