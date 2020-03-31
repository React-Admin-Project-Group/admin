import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import navList from './navlist'  //侧边存放的栏数据
import {
  HomeOutlined,
  UserOutlined,
  SmileOutlined,
  SoundOutlined,
  DatabaseOutlined,
  TeamOutlined,
  ProfileOutlined,
  ReadOutlined,
  LaptopOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import Style from './nav.module.less'
const { SubMenu } = Menu;

function handleClick(e){
  // console.log(e)
  let {path} = e.item.props
  // console.log(this)
  this.props.history.replace(path)
}

 class CustomNav extends Component {
  //  icon图标处理
  renderIcon(icon){
    switch (icon) {
      case 'home':
        return  <HomeOutlined/>
      case 'administrator':
        return  <UserOutlined/>
      case 'banner':
        return  <SoundOutlined/>
      case 'data':
        return  <DatabaseOutlined/>
      case 'user':
        return  <TeamOutlined/>
      case 'cookbook':
        return  <ProfileOutlined />
      case 'menu':
        return  <ReadOutlined/>
      case 'audit':
        return  <LaptopOutlined/>
      default:
        return  <SmileOutlined/>
    }
  }
  //  数据处理
  renderItem(data){
    return data.map((item,index)=>{
     if(item.children){ //判断是否有多级
       return(
        <SubMenu key={item.key} title={(()=>{
          return(
            <span>
              {this.renderIcon(item.icon)}
              {item.title}
            </span>
          )
        })()}>
          {/* 如果里面还有2级 将渲染的方法在调用一遍 */}
          {this.renderItem(item.children)}
        </SubMenu>
       )
     }else{
      // 一级导航
      return(
        <Menu.Item key={item.key} path={item.path}>
          {this.renderIcon(item.icon)}
          {item.title}
        </Menu.Item>
      )
     }
    })
  }
  render() {
    return (
      <div className={Style.nav}>
        <Menu theme="light" mode="inline" style={{ background: '#fff', height: '100%'}} onClick={handleClick.bind(this)}>
          { this.renderItem(navList) }
        </Menu>
      </div>
    )
  }
}
export default withRouter(CustomNav)
