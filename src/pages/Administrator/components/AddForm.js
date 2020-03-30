import React, { Component, Fragment } from 'react'
import { Modal, Form, Input, Radio, Button, message } from 'antd'
import AdminApi from '../../../api/adminApi'
// import imgUpload from '../../../api/imgUpload'
export default class AddForm extends Component {
  state = {
    value: 0
  }
  /* 添加管理员 */
  onFinish = (values) => {
    // 获取输入的值
    const { username, password, authority } = values
    // 调用添加的接口
    AdminApi.administratorAdd({ username, password, authority })
      .then(res => {
        this.props.toggleAddForm(false)
        message.success(res.msg)
        this.props.refreshList()
      })
      .catch(err => {
        console.log(err)
      })
  }

  onFinishFailed = (err) => {
    console.log(err)
  }

  handelCancel = () => {
    this.props.toggleAddForm(false)
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const {visible} = this.props
    return (
      <Fragment>
        {/* <input type='file' ref='img'/>
        <Button onClick={
          async () => {
            let  file = this.refs.img.files[0]
            if(!file){ return message.error('请先选择一张图片')}
            // 图片的验证
            let {size,type} = file 
            console.log(type)
            let types = ['jpg',"jpeg",'gif','png']
            if(size>1000000){ return message.warning('图片超过1m')}
            if(types.indexOf(type.split('/')[1])===-1){ return message.warning('只允许jpg.jpeg,gif,png四种类型')}
            // 调用接口
            // 将图片转化为formdata 
            let formdata = new FormData()
            formdata.append('img',file)
            let {code,msg,path} = await imgUpload.imgUpload(formdata)
          }
        }>上传</Button> */}
        <Modal 
          title='添加管理员'
          visible={visible}
          getContainer={false}
          onCancel={this.handelCancel}
          footer={null}
        >
          <Form
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            initialValues={{
              password: '666666',
              authority: 0
            }
            }
          >
            <Form.Item
              label="管理员名称"
              name="username"
              rules={[
                {
                  required: true,
                  message: '输入管理员名称',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="管理员密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item 
              name="authority"
              label="管理员类型"
            >
              <Radio.Group
              >
                <Radio value={0}>普通管理员</Radio>
                <Radio value={1}>超级管理员</Radio>
              </Radio.Group>
            </Form.Item>  
            <Form.Item style={{'textAlign' : 'center'}}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    )
  }
}
