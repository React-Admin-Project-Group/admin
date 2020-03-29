import React, { Component, Fragment } from 'react'

import Login from '../pages/Login/Login'
import Main from '../pages/Main/Main'
import Home from '@pages/Home/Home'
import Administrator from '../pages/Administrator/Administrator'
import MenuTypeList from '../pages/MenuType/MenuTypeList'
import MenuTypeAdd from '../pages/MenuType/MenuTypeAdd'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

export default class PageRouter extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <Redirect exact path='/' to='/login'></Redirect>
            <Route path='/login' component={ Login }></Route>
            {/* 这里是管理页面 */}
            <Route path='/admin' render={() => {
              return (
                <Fragment>
                  <Route path='/admin/main' render={() => {
                    return (
                      <Fragment>
                        <Main>
                          <Route path='/admin/main/home' component={ Home }></Route>
                          <Route path='/admin/main/administrator' component={ Administrator }></Route>
                          <Route path='/admin/main/menuType' component={ MenuTypeList }></Route>
                          <Route path='/admin/main/menuTypeAdd' component={ MenuTypeAdd }></Route>
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
