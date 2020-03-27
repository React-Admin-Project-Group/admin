import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './Login.module.less'
import imgUrl from '../../static/admin-login-bg.jpg'
import AdminApi from '../../api/adminApi'
import { message }  from 'antd'
export default class Login extends Component {
  onFinish = values => {
    // console.log('Received values of form: ', values);
    const { username, password } = values
    this.login(username, password)
  }
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  login = (username, password) => {
    AdminApi.adminLogin(username, password)
      .then((result) => {
        const { code, msg } = result
        if (code === 20002) {
          message.error(msg)
        }
        if (code === 1) {
          // 登录成功
          this.setLoginInfo(result.list)
          this.props.history.replace('/admin/main')
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  }

  setLoginInfo (list) {
    localStorage.setItem('loginInfo', JSON.stringify(list))
  }
  render() {
    return (
      <div className={style.wrapper}>
        <img src={imgUrl} className={style.bg} alt='背景图'></img>
        <div className={style.title}>
          <h1>下厨房 后台管理系统</h1>
        </div>
        <div className={style.box}>
          <Form className={style.top} onFinish={this.onFinish}>
            {/* 账号 */}
            <UserOutlined className={style.icon} />
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名不能为空!' }]}
            >
              <Input
                placeholder="账户" />
            </Form.Item>
            {/* 密码 */}
            <LockOutlined className={style.icon} />
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空!' }]}
            >
              <Input
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            {/* 记住密码 */}
            <Checkbox>使我保持登录状态</Checkbox>
            {/* 登录 */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className={style.button}>
                登录
              </Button> 
              <Button className={style.button}>取消</Button>
            </Form.Item>
          </Form>
         
        </div>
        <div className={style.bottom}>
          <div>Copyright 你的公司名称 by H-ui.admin v3.1</div>
        </div>
      </div>

    )
  }
}
