import React, { Component, Fragment } from 'react'

import Login from '../pages/Login/Login'
import Main from '../pages/Main/Main'
import Administrator from '../pages/Administrator/Administrator'
import MenuType from '../pages/MenuType'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import NavList from '../pages/MenuTypeBig/MenuList'
import MenuAdd from '../pages/MenuTypeBig/MenuAdd'
import MenuUpdate from '../pages/MenuTypeBig/MenuUpdate'

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
                          <Route path='/admin/main/administrator' component={ Administrator }></Route>
                          <Route path='/admin/main/menuType' component={ MenuType }></Route>
                          <Route path='/admin/main/cookbook' component={ NavList }></Route>
                          <Route path='/admin/main/cookbook/menuadd' component={ MenuAdd }></Route>
                          <Route path='/admin/main/cookbook/menuupdate/:_id' component={ MenuUpdate }></Route>
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
