import React, { Component } from 'react';
import {
  Form, Input, Button, notification
} from 'antd';
import applyService from '@/services/apply.service';

class ApplicationCallbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }


  async componentDidMount() {
    console.log(this.props);
    let res = await applyService.getCallback({
      applyid: this.props.applyId
    });
    if (res.status === 0) {
      this.props.form.setFieldsValue(res.result);
    }
    console.log(1111);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { applyId } = this.props;
        this.setState({
          loading: true
        });
        let res = await applyService.setCallback(
          {
            params: {
              applyid: applyId
            },
            body: {
              applyid: applyId,
              ...values
            }
          }
        );
        this.setState({
          loading: false
        });
        if (res.status === 0) {
          notification.success({
            message: '成功',
            description: '编辑成功'
          });
          this.props.getApplyList();
          this.props.handleClose();
        } else {
          notification.error({
            message: '失败',
            description: res.errorMsg
          });
        }
        console.log(values);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { handleClose } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div className="application-form-update">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="application-form-update-main">
          <Form.Item label="设备上下线">
            {getFieldDecorator('deviceOnline', {
              rules: [{ required: false, message: '请输入设备上下线回调' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确回调地址'
              }]
            })(
              <Input
                placeholder="请输入设备上下线回调地址"
              />,
            )}
          </Form.Item>
          <Form.Item label="设备故障">
            {getFieldDecorator('deviceFailure', {
              rules: [{ required: false, message: '请输入设备故障回调' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确回调地址'
              }]
            })(
              <Input
                placeholder="请输入设备故障回调地址"
              />,
            )}
          </Form.Item>
          <Form.Item label="节点上下线">
            {getFieldDecorator('nodeOnline', {
              rules: [{ required: false, message: '请输入节点上下线回调地址' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确回调地址'
              }]
            })(
              <Input
                placeholder="请输入节点上下线回调地址"
              />,
            )}
          </Form.Item>
          <Form.Item label="刷脸记录">
            {getFieldDecorator('deviceFaceRecord', {
              rules: [{ required: false, message: '请输入刷脸记录回调' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确回调地址'
              }]
            })(
              <Input
                placeholder="请输入设备刷脸记录回调地址"
              />,
            )}
          </Form.Item>
          <Form.Item label="人员同步">
            {getFieldDecorator('devicePersonSync', {
              rules: [{ required: false, message: '请输入刷脸记录回调' }, {
                pattern: /^((ht|f)tps?):\/\/[\w\\-]+(\.[\w\\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/, message: '输入正确回调地址'
              }]
            })(
              <Input
                placeholder="请输入人员同步回调地址"
              />,
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
            <Button onClick={() => { handleClose(); }} style={{ marginLeft: '20px' }}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedApplicationCallbackForm = Form.create({ name: 'normal_login' })(ApplicationCallbackForm);

export default WrappedApplicationCallbackForm;
