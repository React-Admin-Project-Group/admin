import React, { Component } from 'react';
import style from './index.module.less';
import {Avatar,Dropdown,Menu,Badge} from 'antd';
import { DownOutlined,SkinFilled,MailOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
class HeaderNav extends Component {
    state = { 
        bgColor:['black','blue','green','red','yellow','oregon'],
        index:0
    }
    render() { 
      let {bgColor,index} = this.state;
      // let userData = [
      //   {name:'个人中心',event:'login'},
      //   {name:'切换账户',event:'logout2'},
      //   {name:'退出',event:'login'},
      // ]
      let skinData = [
          {name:'默认（黑色）'},
          {name:'蓝色'},
          {name:'绿色'},
          {name:'红色'},
          {name:'黄色'},
          {name:'橙色'},
        ]
      // let createUser = (data)=>{
      //   return(
      //     <Menu onClick={(event)=>{
      //       console.log(event.item.props.event,this)
      //       this.props.history.replace(`/${event.item.props.event}`);
      //     }}>
      //       {data.map((item,index)=>{
      //         return (
      //           <Menu.Item key={index} event={item.event}>
      //             <span>{item.name}</span>
      //             {/* <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">{item.name}</a> */}
      //           </Menu.Item>
      //         )
      //       })}
      //     </Menu>
      //   )
      // }
      const menu = (
        <Menu>
          <Menu.Item>
            <span>个人中心</span>
          </Menu.Item>
          <Menu.Item>
            <span>切换账户</span>
          </Menu.Item>
          <Menu.Item>
            <span onClick={()=>{
              this.props.history.replace('/login');
            }}>退出</span>
          </Menu.Item>
        </Menu>
      );
      let createSkin=(data)=>{
        return(
          <Menu onClick={(key)=>{
            this.setState({index:key.key});
          }}>
            {data.map((item,index)=>{
              return (
                <Menu.Item key={index}>
                  <span>{item.name}</span>
                </Menu.Item>
              )
            })}
          </Menu>
        )
      }
      return (
          <div className={style[bgColor[index]]} style={{ height: 64,display: 'flex',justifyContent: 'space-between'}}>
              <div className={style.left}>
                  <h1>下厨房</h1>
                  <span>V1.0.1</span>
                  <Avatar src="/logo.png" size="large" style={{marginLeft:20}} />
              </div>
              <ul className={style.right}>
                  <li className={style.list}>超级管理员</li>
                  <li className={style.list}>
                      <Dropdown overlay={menu}>
                          <span className={style['ant-dropdown-link']} >
                              admin <DownOutlined style={{color:'#fff',fontSize:12}} />
                          </span>
                      </Dropdown>
                  </li>
                  <li className={style.list}>
                      <div className={style['ant-dropdown-link']}>
                      <Badge count={1} style={{fontSize:8}}>
                          <MailOutlined style={{color:'#fff',fontSize:22}} />
                      </Badge>
                      </div>
                  </li>
                  <li className={style.list}>
                      <Dropdown overlay={createSkin(skinData)}>
                          <span className={style['ant-dropdown-link']}>
                              <SkinFilled style={{color:'#fff',fontSize:18}} />
                          </span>
                      </Dropdown>
                  </li>
              </ul>
          </div>
      );
    }
}
 
export default withRouter(HeaderNav);