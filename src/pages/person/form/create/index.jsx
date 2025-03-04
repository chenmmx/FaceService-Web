import React, { Component } from 'react';
import {
  Form, Input, Button, Select, notification, Upload, message, Icon
} from 'antd';
import FsTitle from '../../../../components/common/fs-title';
import './style.less';
import personService from '@/services/person.service';
import applyService from '@/services/apply.service';
import getCutImg from '@/utils/cutImage';

const { Option } = Select;

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.file = '';
    this.pageType = false;
    this.fileName = '';
    // this.rotate = '';
    this.originalFile = '';
    this.state = {
      id: '',
      loading: false,
      imgLoading: false,
      faceUrl: '',
      phone: '',
      applicationList: [],
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
    this.getApplyList();
    if (this.props.location.state) {
      const data = this.props.location.state;
      this.pageType = true;
      this.setState({
        faceUrl: data.faceUrl,
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

  // 获取应用列表
  getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      console.log(res.result.list);
      this.setState({
        applicationList: res.result.list
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, val) => {
      if (!err) {
        this.setState({ loading: true });
        let faceUrl = await this.fileUpload(this.file);
        if (faceUrl) {
          if (!this.pageType) {
            const res = await personService.add({
              phone: val.phone, applyId: val.applyId, tag: JSON.stringify(val.tag), faceUrl: this.state.faceUrl
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
              id: this.state.id, phone: val.phone, applyId: val.applyId, tag: JSON.stringify(val.tag), faceUrl: this.state.faceUrl
            });
            if (res.status === 0) {
              notification.success({
                message: '成功',
                description: '修改成功'
              });
              this.setState({ loading: false });
              this.props.history.push('/person');
            } else {
              this.setState({ loading: false });
              notification.error({
                message: '错误',
                description: res.errorMsg
              });
            }
          }
        } else {
          this.setState({ loading: false });
          message.error('图片上传错误，请稍后再试');
        }
      }
    });
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 格式图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('图片大小不能超过5MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  // 图片上传检测
  handleChange = async (file) => {
    this.setState({ imgLoading: true, faceUrl: '' });
    if (file.file.status === 'uploading') {
      this.originalFile = file.file.originFileObj;
      // this.file = await this.toBase64(file.file.originFileObj);
      // this.drawCanvas(this.file);
      this.fileName = file.file.name;
      return;
    }
    if (file.file.status === 'done') {
      // Get this url from response in real world
      if (file.file.response.status === 0) {
        // this.rotate = file.response.result[4];
        let x = file.file.response.result[0];
        let y = file.file.response.result[1];
        let width = file.file.response.result[2];
        let height = file.file.response.result[3];
        await getCutImg(x, y, width, height, file.file.originFileObj, (res) => {
          this.onCollectionFile(res);
        });
        // this.cutColorFace(x, y, width, height);
        // this.setState({ imgLoading: false });
      } else {
        this.setState({ faceUrl: '', imgLoading: false });
        message.error('请上传人脸图片');
      }
    }
  }

  // 设置裁剪后的图片
  onCollectionFile = async (data) => {
    this.file = data.file;
    this.setState({ faceUrl: URL.createObjectURL(this.file), imgLoading: false });
  }

  // 正式上传
  fileUpload = async (file) => {
    let faceUrl;
    if (this.file) {
      let formData = new FormData();
      // formData.append('source', this.originalFile);
      formData.append('cut', file);
      // await this.getAuthorization();
      let result = await personService.upload(formData);
      if (result.status === 0) {
        faceUrl = result.result;
        this.setState({ faceUrl });
        // this.loading = false
        // this.formData.personImageUrl = `https://chobits-maintain-test-1258685914.cos.ap-chengdu.myqcloud.com/person/${timestamp + file.name}`
      } else {
        faceUrl = false;
      }
    } else if (this.state.faceUrl) {
      faceUrl = true;
    } else {
      faceUrl = false;
    }
    return faceUrl;
  }

  render() {
    const { loading, applicationList } = this.state;
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
    const uploadButton = (
      <div>
        <Icon type={this.state.imgLoading ? 'loading' : 'plus'} />
      </div>
    );
    return (
      <div className="application-form">
        <FsTitle title="人员管理" />
        <div style={{ padding: '0px 24px 0px', fontSize: 14, color: 'black' }}>基本信息</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="application-form-main">
          <Form.Item label="用户头像">
            {getFieldDecorator('faceUrl', {
              rules: [{ required: true, message: '请选择用户头像' }],
              valuePropName: 'file',
              initialValue: this.state.faceUrl
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://detect.facebeacon.com/api/Detect/FaceDetect"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {this.state.faceUrl ? <img src={this.state.faceUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="应用名称">
            {getFieldDecorator('applyId', {
              rules: [{ required: true, message: '请输入应用名称' }],
              initialValue: this.state.applyId
            })(
              <Select allowClear placeholder="请选择应用名称">
                {
                  applicationList.map((item) => (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  ))
                }
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
