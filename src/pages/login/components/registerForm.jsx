/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, Button
} from 'antd';
import { login } from '../../../store/actions/common';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.props);
        const { handleLogin, history } = this.props;
        history.push('/application');
        handleLogin();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { changeState } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
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
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="确认密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className="register-form-button">
                注册
          </Button>
          <Button onClick={() => { changeState(); }} type="link" className="register-form-register">使用已有账号登录</Button>
        </Form.Item>
      </Form>
    );
  }
}

RegisterForm.propTypes = {
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

const wrappedRegisterForm = Form.create({ name: 'login_form' })(RegisterForm);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(wrappedRegisterForm));
