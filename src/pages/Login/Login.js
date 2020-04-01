import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './Login.module.less'
import imgUrl from '../../static/admin-login-bg.jpg'
import AdminApi from '../../api/adminApi'
import { message }  from 'antd'
import { connect } from 'react-redux'
import ActionCreator from '../../store/actionCreator'
import { bindActionCreators } from 'redux'
class Login extends Component {
  onFinish = values => {
    const { username, password, remember } = values
    this.login(username, password, remember)
  }
  onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo)
  }

  login = (username, password, remember) => {
    AdminApi.adminLogin(username, password)
      .then((result) => {
        const { code, msg } = result
        if (code === 20002) {
          message.error(msg)
        }
        if (code === 1) {
          // 登录成功
          this.setLoginInfo(result.list, remember)
          this.props.history.replace('/admin/main/home')
        }
      })
      .catch(err => {
        console.log('err:', err)
      })
  }

  setLoginInfo (list, remember) {
    if (remember) {
      sessionStorage.removeItem('loginInfo')
      localStorage.setItem('loginInfo', JSON.stringify(list))
    } else {
      localStorage.removeItem('loginInfo')
      sessionStorage.setItem('loginInfo', JSON.stringify(list))
    }
    this.props.CHANGE_LOGIN_STATE(true)
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
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>使我保持登录状态</Checkbox>
            </Form.Item>
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
          <div>本后台系统由银河战队提供前端技术支持</div>
        </div>
      </div>

    )
  }
}

export default connect(state => state, dispatch => {
  return bindActionCreators(ActionCreator, dispatch)
})(Login)
