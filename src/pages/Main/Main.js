import React, { Component } from 'react'
import HeaderNav from './HeaderNav';
import CustomNav from '../../components/CustomNav' //引入侧边栏组件
import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
  
  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          {/* 侧边栏 */}
        <Sider >
          <div className="logo" />
          <CustomNav></CustomNav>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <HeaderNav></HeaderNav>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div> */}
            { this.props.children }
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
      </div>
    )
  }
}
