import React, { Component, Fragment } from 'react'

import Login from '../pages/Login/Login'
import Main from '../pages/Main/Main'
import Administrator from '../pages/Administrator/Administrator'
import { HashRouter, Switch, Route } from 'react-router-dom'

export default class PageRouter extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            {/* 登录页面 */}
            <Route path='/login' component={ Login }></Route>
            {/* 这里是管理页面 */}
            <Route path='/admin' render={() => {
              return (
                <Fragment>
                  <Route path='/admin/main' render={() => {
                    return (
                      <Fragment>
                        <Main>
                          <Route path='/admin/main/administrator' component={ Administrator }></Route>
                        </Main>
                      </Fragment>
                    )
                  }}>
                  </Route>
                </Fragment> 
              )
            }}>

            </Route>
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}