import React, { Component } from 'react'
import imgUrl from '../../static/404.png'
import style from './index.module.less'
import { Button } from 'antd'
export default class NotFound extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <img src={imgUrl} className={style.bg} alt='背景图'>
        </img>
        <Button className={style.button}  onClick={()=>{
          this.props.history.replace('/admin/main/home')
        }}>回到首页</Button>
      </div>
    )
  }
}
