import React, { Component, Fragment } from 'react'
import { HashRouter, Switch } from 'react-router-dom'
// import { Route,Redirect } from 'react-router-dom';

/* import loadable from '../utils/loadable'
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
            {/* <Route path="/login" component={Login}></Route> */}
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}
