import React, { Component, Fragment } from 'react'
import { HashRouter, Switch } from 'react-router-dom'

/* import Login from '../pages/Login/Login'
import Main from '../pages/Main/Main'
import Home from '@pages/Home/Home'
import Administrator from '../pages/Administrator/Administrator'
import MenuTypeList from '../pages/MenuType/MenuTypeList'
import MenuTypeAdd from '../pages/MenuType/MenuTypeAdd'
import BannerList from '@pages/Banner/BannerList'
import BannerAmend from '@pages/Banner/BannerAmend'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import KindList from '../pages/MenuTypeBig/KindList'
import KindAdd from '../pages/MenuTypeBig/KindAdd'
import KindUpdate from '../pages/MenuTypeBig/KindUpdate'

 */
import FrontedAuth from './FrontedAuth'
export default class PageRouter extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            {/* <Redirect exact path='/' to='/login'></Redirect>
            <Route path='/login' component={ Login }></Route>
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
                          <Route path='/admin/main/banner/list' component={BannerList}></Route>
                          <Route path='/admin/main/banner/amend/:id' component={BannerAmend}></Route>
                          <Route exact path='/admin/main/cookbook/add' component={ KindList }></Route>
                          <Route path='/admin/main/cookbook/menuadd' component={ KindAdd }></Route>
                          <Route path='/admin/main/cookbook/menuupdate/:_id' component={KindUpdate }></Route>
                        </Main>
                      </Fragment>
                    )
                  }}>
                  </Route>
                </Fragment> 
              )
            }}>

            </Route> */}
            <FrontedAuth></FrontedAuth>
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}
