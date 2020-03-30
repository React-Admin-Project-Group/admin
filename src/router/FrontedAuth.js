import React, { Component } from 'react'
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import routerConfig from './frontend-auth.model'

function find(path) {
  for (let item of routerConfig) {
    if (item.path === path) return item.component
  }
  return false
}
class FrontedAuth extends Component {
  render () {
    const { loginState, location } = this.props
    // 地址栏的路劲
    const pathname = location.pathname
    // 路劲匹配后返回的组件
    const matchComponent = find(pathname)
    if (matchComponent) {
      /* 如果是登录, 则在已登录的情况下跳转到首页，否则正常到登录 */
      if (pathname === '/login') {
        if (loginState) {
          console.log('重定向到首页')
          return <Redirect to = '/' />
        } else {
          console.log('渲染登录')
          return <Route path={pathname} component={matchComponent}/>
        }
      }
      /* 如果不是登录组件，又在登录状态，则正常渲染, 否则重定向到登录 */
      if (loginState) {
        console.log('渲染正常页面')
        return (<Route path={pathname} component={matchComponent}/>)
      } else {
        if (pathname === '/404') return (<Route path={pathname} component={matchComponent}/>)
        return <Redirect to='/login' />
      }
    } else {
      /* 路劲不匹配则404 */
      console.log('路劲不匹配')
      return <Redirect to='/404' />
    }
  }
}

export default connect(state => state)(FrontedAuth)

