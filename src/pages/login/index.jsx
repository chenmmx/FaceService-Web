import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../store/actions/common';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './style.less';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: false
    };
  }

  componentDidMount() {
    const { isLogin, handleLogout } = this.props;
    if (isLogin) {
      handleLogout();
    }
  }

  changeState = () => {
    const { isRegister } = this.state;
    this.setState({
      isRegister: !isRegister
    });
  }

  render() {
    const { isRegister } = this.state;
    return (
      <div id="login">
        <div className="login-header">
          <h2 className="login-header-title">人脸服务开放平台</h2>
        </div>
        <div className="login-main">
          <div className="login-main-form">
            {
                isRegister ? <RegisterForm changeState={this.changeState} /> : <LoginForm changeState={this.changeState} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { common } = state;
  return {
    isLogin: common.isLogin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  console.log(props);
  return {
    handleLogout() {
      const action = logout();
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
