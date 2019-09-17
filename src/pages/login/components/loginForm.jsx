/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, Button, Checkbox
} from 'antd';
import { login } from '../../../store/actions/common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { handleLogin } = this.props;
        handleLogin();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>记住密码</Checkbox>)}
          <a className="login-form-forgot" href="">
                忘记密码
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
          <a href="" className="login-form-register">立即注册</a>
        </Form.Item>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { common } = state;
  return {
    isLogin: common.value
  };
};

const mapDispatchToProps = (dispatch, props) => {
  console.log(props);
  return {
    handleLogin() {
      const action = login();
      dispatch(action);
    }
  };
};

const wrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedLoginForm);
