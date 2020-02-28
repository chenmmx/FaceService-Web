import React, { Component } from 'react';
import {
  Form, Input, Button, Select, Row, Col, InputNumber, Slider, DatePicker, Spin, notification, TimePicker, message
} from 'antd';
import moment from 'moment';
import FsTitle from '@/components/common/fs-title';
import redpupilService from '@/services/redpupil.service';
import applyService from '@/services/apply.service';
import './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

class DeviceFormUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formLoading: false,
      applyList: []
    };
  }

  componentDidMount() {
    this.getRedpupilInfo();
    this.getApplyList();
  }


  getApplyList = async () => {
    let res = await applyService.getListByPage({
      pageIndex: 1,
      pageSize: 999,
      name: ''
    });
    if (res.status === 0) {
      console.log(res.result.list);
      this.setState({
        applyList: res.result.list
      });
    }
  }

  getRedpupilInfo = async () => {
    this.setState({
      formLoading: true
    });
    let res = await redpupilService.getInfo({
      id: this.props.match.params.id
    });
    this.setState({
      formLoading: false
    });
    if (res.status === 0) {
      let { result } = res;
      // result.thresholdSetting = JSON.parse(result.thresholdSetting);
      // result.systemSetting = JSON.parse(result.systemSetting);
      let runTime = JSON.parse(result.runTime);
      console.log(runTime);
      let fieldsValues = {
        id: result.id,
        name: result.name,
        applyId: result.applyId,
        warranty: [moment(result.warrantyStartTime), moment(result.warrantyEndTime)],
        password: result.password,
        recognizeThreshold: result.recognizeThreshold,
        liveThreshold: result.liveThreshold,
        detectWindow: result.detectWindow,
        recognizeTimeSpan: result.recognizeTimeSpan,
        screenLockTime: result.screenLockTime,
        screenBrightness: result.screenBrightness,
        fillBrightness: result.fillBrightness,
        volume: result.volume,
        operateStartTime: moment(runTime[0], 'HH:mm:ss'),
        operateEndTime: moment(runTime[1], 'HH:mm:ss')
      };
      this.props.form.setFieldsValue(fieldsValues);
    } else {
      notification.error({
        message: '失败',
        description: res.errorMsg
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (values.operateStartTime > values.operateEndTime) {
        message.error('设备运行开始时间应小于设备运行结束时间');
        return;
      }
      if (!err) {
        this.setState({
          loading: true
        });
        let formData = {
          id: this.props.match.params.id,
          name: values.name,
          warrantyStartTime: values.warranty[0].format('YYYY-MM-DD'),
          warrantyEndTime: values.warranty[1].format('YYYY-MM-DD'),
          applyId: values.applyId,
          password: values.password,
          runTime: [values.operateStartTime.format('HH:mm:ss'), values.operateEndTime.format('HH:mm:ss')],
          recognizeThreshold: Number(values.recognizeThreshold),
          liveThreshold: Number(values.liveThreshold),
          detectWindow: Number(values.detectWindow),
          recognizeTimeSpan: Number(values.recognizeTimeSpan),
          screenLockTime: Number(values.screenLockTime),
          screenBrightness: Number(values.screenBrightness),
          fillBrightness: Number(values.fillBrightness),
          volume: Number(values.volume)
        };
        formData.runTime = JSON.stringify(formData.runTime);
        const res = await redpupilService.update(formData);
        this.setState({
          loading: false
        });
        if (res.status === 0) {
          const { history } = this.props;
          history.push('/device');
          notification.success({
            message: '成功',
            description: '修改成功'
          });
        } else {
          notification.error({
            message: '失败',
            description: res.errorMsg
          });
        }
      }
    });
  }

  render() {
    const { loading, formLoading, applyList } = this.state;
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
    const wrapperCol = 10;

    return (
      <div className="device-form-add">
        <FsTitle title="编辑设备" />
        <Spin spinning={formLoading}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="device-form-add-main">
            <Row>
              <Col span={wrapperCol} offset={2}>
                <div className="form-add-text">基础数据</div>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="设备名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入设备名称' }]
                  })(
                    <Input
                      placeholder="请输入设备名称"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item label="保修期">
                  {getFieldDecorator('warranty', {
                    rules: [{ required: true, message: '请选择保修期' }]
                  })(
                    <RangePicker
                      placeholder={['开始日期', '结束日期']}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="设备id">
                  {getFieldDecorator('id', {
                    rules: [{ required: true, message: '请输入设备id' }]
                  })(
                    <Input
                      disabled
                      placeholder="请输入设备id"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item label="应用">
                  {getFieldDecorator('applyId', {
                    rules: [{ required: true, message: '请选择应用' }]
                  })(
                    <Select allowClear placeholder="请选择应用">
                      {
                      applyList.map((item) => (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                      ))
                    }
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol} offset={2}>
                <div className="form-add-text">系统设置</div>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="密码">
                  {getFieldDecorator('password', {
                    initialValue: '123456',
                    rules: [{ required: true, message: '请输入密码' }]
                  })(
                    <Input
                      placeholder="请输入密码"
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol} offset={2}>
                <div className="form-add-text">识别设置</div>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="识别阈值">
                  {getFieldDecorator('recognizeThreshold', {
                    initialValue: '0.57',
                    rules: [{ required: true, message: '请输入识别阈值' }]
                  })(
                    <InputNumber
                      min={0}
                      max={1}
                      step={0.1}
                      placeholder="请输入识别阈值"
                      style={{ width: '100%' }}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item label="活体阈值">
                  {getFieldDecorator('liveThreshold', {
                    initialValue: '0.86',
                    rules: [{ required: true, message: '请输入活体阈值' }]
                  })(
                    <InputNumber
                      min={0}
                      max={1}
                      step={0.1}
                      placeholder="请输入活体阈值"
                      style={{ width: '100%' }}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="检测窗大小">
                  {getFieldDecorator('detectWindow', {
                    initialValue: '80',
                    rules: [{ required: true, message: '请输入检测窗大小' }]
                  })(
                    <InputNumber
                      min={0}
                      max={100}
                      placeholder="请输入检测窗大小"
                      style={{ width: '100%' }}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item label="识别间隔">
                  {getFieldDecorator('recognizeTimeSpan', {
                    initialValue: '5',
                    rules: [{ required: true, message: '请输入识别间隔' }]
                  })(
                    <InputNumber
                      min={0}
                      max={100}
                      placeholder="请输入识别间隔"
                      style={{ width: '100%' }}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol} offset={2}>
                <div className="form-add-text">门禁设置</div>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="屏幕锁定时间">
                  {getFieldDecorator('screenLockTime', {
                    initialValue: 10,
                    rules: [{ required: true, message: '请输入屏幕锁定时间' }]
                  })(
                    <Slider
                      min={10}
                      max={60}
                      tipFormatter={(value) => (`${value}分钟`)}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item label="屏幕亮度">
                  {getFieldDecorator('screenBrightness', {
                    initialValue: 100,
                    rules: [{ required: true, message: '请输入屏幕亮度' }]
                  })(
                    <Slider />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="补光灯亮度">
                  {getFieldDecorator('fillBrightness', {
                    initialValue: 100,
                    rules: [{ required: true, message: '请输入补光灯亮度' }]
                  })(
                    <Slider />,
                  )}
                </Form.Item>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item label="音量">
                  {getFieldDecorator('volume', {
                    initialValue: 100,
                    rules: [{ required: true, message: '请输入音量' }]
                  })(
                    <Slider />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={wrapperCol}>
                <Form.Item label="设备运行开始时间">
                  {getFieldDecorator('operateStartTime', {
                    initialValue: moment('00:00:00', 'HH:mm:ss'),
                    rules: [{ required: true, message: '请选择设备运行时间' }]
                  })(
                    <TimePicker
                      style={{ width: '100%' }}
                      format="HH:mm:ss"
                      placeholder="请选择时间"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item label="设备运行结束时间">
                  {getFieldDecorator('operateEndTime', {
                    initialValue: moment('23:59:59', 'HH:mm:ss'),
                    rules: [{ required: true, message: '请选择设备运行时间' }]
                  })(
                    <TimePicker
                      style={{ width: '100%' }}
                      format="HH:mm:ss"
                      placeholder="请选择时间"
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
              <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
              <Button onClick={() => { history.push('/device'); }} style={{ marginLeft: '20px' }}>取消</Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}

const WrappedDeviceFormUpdate = Form.create({ name: 'normal_login' })(DeviceFormUpdate);

export default WrappedDeviceFormUpdate;
