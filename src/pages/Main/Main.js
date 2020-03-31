import React, { Component } from 'react'
import HeaderNav from './HeaderNav';
import CustomNav from '../../components/CustomNav' //引入侧边栏组件
import { Layout } from 'antd';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import ActionCreator from '@store/actionCreator'
import { bindActionCreators } from 'redux'
import Style from './main.module.less'
const { Header, Content, Footer, Sider } = Layout;

class Main extends Component {
  state = {
    bgColor:['green','blue','black','red','yellow','oregon']
  }
  render() {
    let {bgColor} = this.state
    return (
      <div>
        <Layout style={{ minHeight: '100vh'}}>
          {/* 侧边栏 */}
        <Sider >
          <div className={Style[bgColor[this.props.index]]} >
            <a href="/" className={Style.logo}>下厨房</a>
          </div>
          <CustomNav></CustomNav>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <HeaderNav></HeaderNav>
          </Header>
          <Content style={{ margin: '0px 20px' , paddingTop: '20px', boxSizing: 'border-box'}}> 
          {/* , paddingTop: '20px', boxSizing: 'border-box'  */}
          {/* <Content> */}
            { this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
      </div>
    )
  }
}

export default withRouter(connect(state => state, dispatch => {
  return bindActionCreators(ActionCreator, dispatch)
})(Main));