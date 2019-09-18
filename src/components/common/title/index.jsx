import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

class MyTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { title } = this.props;
    return (
      <div className="title">
        <div>{title}</div>
      </div>
    );
  }
}

MyTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default MyTitle;
