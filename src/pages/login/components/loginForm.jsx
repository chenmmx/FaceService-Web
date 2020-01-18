/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, Button, Checkbox, notification
} from 'antd';
import { login } from '../../../store/actions/common';
import loginService from '@/services/login.service';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem('checked') && window.localStorage.getItem('checked') === '1') {
      let username = window.localStorage.getItem('username');
      let password = window.localStorage.getItem('password');
      this.props.form.setFieldsValue({
        username,
        password,
        checked: true
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { handleLogin, history } = this.props;
        this.setState({
          loading: true
        });
        let res = await loginService.login(values);
        this.setState({
          loading: false
        });
        if (res.status === 0) {
          if (values.checked) {
            window.localStorage.setItem('username', values.username);
            window.localStorage.setItem('password', values.password);
            window.localStorage.setItem('checked', 1);
          } else {
            window.localStorage.removeItem('username', values.username);
            window.localStorage.removeItem('password', values.password);
            window.localStorage.removeItem('checked');
          }
          let { token } = res.result;
          window.localStorage.setItem('token', token);
          handleLogin();
          history.push('/application');
          notification.success({
            message: '成功',
            description: '登录成功'
          });
        } else {
          notification.error({
            message: '失败',
            description: res.errorMsg
          });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { changeState } = this.props;
    const { loading } = this.state;
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
          {getFieldDecorator('checked', {
            valuePropName: 'checked',
            initialValue: false
          })(<Checkbox>记住密码</Checkbox>)}
          <a className="login-form-forgot" href="">
                忘记密码
          </a>
          <Button size="large" type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                登录
          </Button>
          {/* <Button onClick={() => { changeState(); }} type="link" className="login-form-register">立即注册</Button> */}
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
    isLogin: common.isLogin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  console.log(props);
  return {
    handleLogin: () => { dispatch(login()); }
  };
};

const wrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(wrappedLoginForm));
