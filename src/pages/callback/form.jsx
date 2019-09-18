import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

export class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        setTimeout(() => {
          this.setState({
            loading: false
          });
          this.props.handleCancel();
          this.props.form.resetFields();
        }, 500);
        console.log(values);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { handleCancel } = this.props;
    const { getFieldDecorator, resetFields } = this.props.form;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="回调名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入回调名称' }]
            })(
              <Input placeholder="请输入名称" />
            )}
          </Form.Item>
          <Form.Item label="回调地址">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入回调地址' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确网址'
              }]
            })(
              <Input placeholder="请输入回调的URL" />
            )}
          </Form.Item>
          <div style={{ marginTop: 50, textAlign: 'center' }}>
            <Button
              style={{ marginRight: 20 }}
              onClick={() => { handleCancel(); resetFields(); }}
            >取消
            </Button>
            <Button type="primary" loading={loading} htmlType="submit">确定</Button>
          </div>
        </Form>
      </>
    );
  }
}

MyForm.propTypes = {
  handleCancel: PropTypes.func.isRequired
};

const MyForm1 = Form.create({ name: 'callbackForm' })(MyForm);

export default MyForm1;
