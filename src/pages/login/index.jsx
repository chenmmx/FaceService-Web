import React, { Component } from 'react';
import LoginForm from './components/loginForm';
import './style.less';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div id="login">
        <div className="login-header">
          <h2 className="login-header-title">人脸服务开放平台</h2>
        </div>
        <div className="login-main">
          <div className="login-main-form">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
