import React, { Component } from 'react';
import {
  Form, Input, Button, Select, Row, Col, InputNumber, Slider, DatePicker, notification
} from 'antd';
import FsTitle from '@/components/common/fs-title';
import redpupilService from '@/services/redpupil.service';
import './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

class DeviceFormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log(values);
      if (!err) {
        this.setState({
          loading: true
        });
        let formData = {
          name: values.name,
          warrantyStartTime: values.warranty[0].format('YYYY-MM-DD'),
          warrantyEndTime: values.warranty[1].format('YYYY-MM-DD'),
          applyId: values.applyId,
          systemSetting: {
            password: values.password
          },
          thresholdSetting: {
            recognizeThreshold: values.recognizeThreshold,
            liveThreshould: values.liveThreshould,
            detectWindow: values.detectWindow,
            recognizeTimeSpan: values.recognizeTimeSpan,
            screenLockTime: values.screenLockTime,
            screenLightTime: values.screenLightTime,
            fillLightTime: values.fillLightTime,
            volume: values.volume,
            operateStartTime: values.operateTime[0].format('YYYY-MM-DD'),
            operateEndTime: values.operateTime[1].format('YYYY-MM-DD')
          }
        };
        formData.systemSetting = JSON.stringify(formData.systemSetting);
        formData.thresholdSetting = JSON.stringify(formData.thresholdSetting);
        const res = await redpupilService.add(formData);
        this.setState({
          loading: false
        });
        if (res.status === 0) {
          const { history } = this.props;
          history.push('/device');
          notification.success({
            message: '成功',
            description: '新增赤眸成功'
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
    const wrapperCol = 10;

    return (
      <div className="device-form-add">
        <FsTitle title="新增设备" />
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
                    format="YYYY-MM-DD"
                    placeholder={['开始日期', '结束日期']}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            {/* <Col span={wrapperCol}>
              <Form.Item label="进出标识">
                {getFieldDecorator('direction', {
                  initialValue: '进',
                  rules: [{ required: true, message: '请选择进出标识' }]
                })(
                  <Select allowClear placeholder="请选择进出标识">
                    <Option value="进">进</Option>
                    <Option value="出">出</Option>
                  </Select>
                )}
              </Form.Item>
            </Col> */}
            <Col span={wrapperCol}>
              <Form.Item label="应用">
                {getFieldDecorator('applyId', {
                  initialValue: '7551f009-d4b2-4afd-bab5-782dd0521050',
                  rules: [{ required: true, message: '请选择应用' }]
                })(
                  <Select allowClear placeholder="请选择应用">
                    <Option value="7551f009-d4b2-4afd-bab5-782dd0521050">7551f009-d4b2-4afd-bab5-782dd0521050</Option>
                    <Option value="jack">jack</Option>
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
                {getFieldDecorator('liveThreshould', {
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
                {getFieldDecorator('screenLightTime', {
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
                {getFieldDecorator('fillLightTime', {
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
              <Form.Item label="设备运行时间">
                {getFieldDecorator('operateTime', {
                  rules: [{ required: true, message: '请选择设备运行时间' }]
                })(
                  <RangePicker
                    mode={['date', 'date']}
                    format="YYYY-MM-DD"
                    placeholder={['开始时间', '结束时间']}
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
      </div>
    );
  }
}

const WrappedDeviceFormAdd = Form.create({ name: 'normal_login' })(DeviceFormAdd);

export default WrappedDeviceFormAdd;
