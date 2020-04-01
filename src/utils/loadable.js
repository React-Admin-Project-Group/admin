import React from 'react'
import LoadAble from 'react-loadable'
import { Spin, Alert } from 'antd';
// 过度组件
function LoadingComponent () {
  return (
    <div style={ {height: '100%', width: '100%' } }>
      <Spin tip="加载中...">
      <Alert
        message="页面加载中"
        description="请耐心稍等片刻."
        type="info"
      />
      </Spin>
    </div>
  )
}

export default (LoadComponent) => {
  return LoadAble({
    loader: LoadComponent,
    loading: LoadingComponent
  })
}