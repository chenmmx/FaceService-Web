import React, { Component } from 'react';
import {
  Form, Input, Button, Select, notification
} from 'antd';
import FsTitle from '../../../../components/common/fs-title';
import './style.less';
import personService from '@/services/person.service';

const { Option } = Select;

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.pageType = false;
    this.state = {
      id: '',
      loading: false,
      phone: '',
      tag: {
        name: '',
        personName: '',
        idNo: '',
        idNumber: '',
        personType: ''
      }
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      const data = this.props.location.state;
      this.pageType = true;
      this.setState({
        phone: data.phone,
        id: data.id,
        tag: data.tag ? JSON.parse(data.tag) : {
          name: '',
          personName: '',
          idNo: '',
          idNumber: '',
          personType: ''
        }
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, val) => {
      if (!err) {
        if (!this.pageType) {
          const res = await personService.add({
            phone: val.phone, faceUrl: 'http://192.168.1.222///group1/M00/01/56/wKgB3l4UNYCATQVEAACa6ReMoCI77.jpeg', applyId: '7551f009-d4b2-4afd-bab5-782dd0521050', tag: JSON.stringify(val.tag)
          });
          if (res.status === 0) {
            notification.success({
              message: '成功',
              description: '添加成功'
            });
            this.props.history.push('/person');
          } else {
            notification.error({
              message: '错误',
              description: res.errorMsg
            });
          }
        } else {
          const res = await personService.update({
            id: this.state.id, phone: val.phone, faceUrl: 'http://192.168.1.222///group1/M00/01/56/wKgB3l4UNYCATQVEAACa6ReMoCI77.jpeg', applyId: '7551f009-d4b2-4afd-bab5-782dd0521050', tag: JSON.stringify(val.tag)
          });
          if (res.status === 0) {
            notification.success({
              message: '成功',
              description: '修改成功'
            });
            this.props.history.push('/person');
          } else {
            notification.error({
              message: '错误',
              description: res.errorMsg
            });
          }
        }
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { history } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div className="application-form">
        <FsTitle title="人员管理" />
        <div style={{ padding: '0px 24px 0px', fontSize: 14, color: 'black' }}>基本信息</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="application-form-main">
          <Form.Item label="应用名称">
            {getFieldDecorator('tag.name', {
              rules: [{ required: true, message: '请输入应用名称' }],
              initialValue: this.state.tag.name
            })(
              <Select allowClear placeholder="请选择应用名称">
                <Option value="123">123</Option>
                <Option value="jack">jack</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('tag.personName', {
              rules: [{ required: true, message: '请输入姓名' }],
              initialValue: this.state.tag.personName
            })(
              <Input
                placeholder="请输入姓名"
              />
            )}
          </Form.Item>
          <Form.Item label="卡号(idNo)">
            {getFieldDecorator('tag.idNo', {
              rules: [{ required: false, message: 'Please input your username!' }],
              initialValue: this.state.tag.idNo
            })(
              <Input
                placeholder="请输入卡号"
              />
            )}
          </Form.Item>
          <Form.Item label="身份证号">
            {getFieldDecorator('tag.idNumber', {
              rules: [{ required: false, message: '请输入正确身份证', pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/ }],
              initialValue: this.state.tag.idNumber
            })(
              <Input
                placeholder="请输入身份证号"
              />,
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: '请输入正确手机号', pattern: /^1[3456789]\d{9}$/ }],
              initialValue: this.state.phone
            })(
              <Input
                placeholder="请输入手机号"
              />,
            )}
          </Form.Item>
          <Form.Item label="人员类型" className="personType">
            {getFieldDecorator('tag.personType', {
              rules: [{ required: false, message: 'Please input your username!' }],
              initialValue: this.state.tag.personType
            })(
              <Input
                placeholder="请输入人员类型"
              />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
            <Button onClick={() => { history.push('/person'); }} style={{ marginLeft: '20px' }}>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedAddPerson = Form.create({ name: 'normal_login' })(AddPerson);

export default WrappedAddPerson;
