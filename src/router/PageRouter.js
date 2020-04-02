import React, { Component, Fragment } from 'react'
import { HashRouter, Switch } from 'react-router-dom'
/* import { Route,Redirect } from 'react-router-dom';

import loadable from '../utils/loadable'
const Login = loadable(() => import('../pages/Login/Login'))
const Main = loadable(() => import('../pages/Main/Main'))
const Home = loadable(() => import('@pages/Home/Home'))
const Administrator = loadable(() => import('../pages/Administrator/Administrator'))
const MenuTypeList = loadable(() => import('../pages/MenuType/MenuTypeList'))
const MenuTypeAdd = loadable(() => import('../pages/MenuType/MenuTypeAdd'))
const ErrorPage = loadable(() => import('@pages/NotFound/NotFound'))
const BannerList = loadable(() => import('@pages/Banner/BannerList'))
const BannerAmend = loadable(() => import('@pages/Banner/BannerAmend'))
const KindList = loadable(() => import('../pages/MenuTypeBig/KindList'))
const KindAdd = loadable(() => import('../pages/MenuTypeBig/KindAdd'))
const KindUpdate = loadable(() => import('../pages/MenuTypeBig/KindUpdate')) */
import FrontedAuth from './FrontedAuth'
export default class PageRouter extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <FrontedAuth></FrontedAuth>
            {/* <Route path="/login" component={Login}></Route>
            <Route path="/" render={ ()=> {
              return (
                <Fragment>
                  <Main>
                    <Route path="/admin/main/home" component={Home}></Route>
                    <Route path="/admin/main/administrator" component={Administrator}></Route>
                    <Route path="/admin/main/menuType" component={MenuTypeList}></Route>
                    <Route path="/admin/main/menuTypeAdd" component={MenuTypeAdd}></Route>
                    <Route path="/admin/main/banner/list" component={BannerList}></Route>
                    <Route path="/admin/main/banner/amend/:id" component={BannerAmend}></Route>
                    <Route path="/admin/main/cookbook/add" component={KindList}></Route>
                    <Route path="/admin/main/cookbook/menuadd" component={KindAdd}></Route>
                    <Route path="/admin/main/cookbook/menuupdate/:id" component={KindUpdate}></Route>
                    <Route path="/login" component={Login}></Route>
                  </Main>
                </Fragment>
              )
            }}>
            </Route> */}
            
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}
