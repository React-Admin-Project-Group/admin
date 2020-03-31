import React from 'react'
import Login from '../pages/Login/Login'
import Main from '../pages/Main/Main'

import Home from '@pages/Home/Home'
import Administrator from '../pages/Administrator/Administrator'
import MenuTypeList from '../pages/MenuType/MenuTypeList'
import MenuTypeAdd from '../pages/MenuType/MenuTypeAdd'
import ErrorPage from '@pages/NotFound/NotFound'
import BannerList from '@pages/Banner/BannerList'
import BannerAmend from '@pages/Banner/BannerAmend'
import KindList from '../pages/MenuTypeBig/KindList'
import KindAdd from '../pages/MenuTypeBig/KindAdd'
import KindUpdate from '../pages/MenuTypeBig/KindUpdate'

import { Route } from 'react-router-dom'

const routerConfig  = [
  {
    path:'/',
    component:() => {
      return(
        <Main>
          <Route path='/' component={ Home }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/home',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/home' component={ Home }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/administrator',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/administrator' component={ Administrator }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/menuType',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/menuType' component={ MenuTypeList }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/menuTypeAdd',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/menuTypeAdd' component={ MenuTypeAdd }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/banner/list',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/banner/list' component={ BannerList }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/banner/amend/:id',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/banner/amend/:id' component={ BannerAmend }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/cookbook/add',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/cookbook/add' component={ KindList }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/cookbook/menuadd',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/cookbook/menuadd' component={ KindAdd }></Route>
        </Main>
      )
    }
  },
  {
    path:'/admin/main/cookbook/menuupdate/:id',
    component: () => {
      return(
        <Main>
          <Route path='/admin/main/cookbook/menuupdate/:id' component={ KindUpdate }></Route>
        </Main>
      )
    }
  },
  {
      path:'/login',
      component:Login,
  },{
      path:'/404',
      component:ErrorPage
  }
];
export default routerConfig