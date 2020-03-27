import React, { Component } from 'react'
import { Popconfirm, Button, Card, Table, message, Pagination } from 'antd'
import AdminApi from '../../api/adminApi'
export default class Administrator extends Component {
  constructor () {
    super()
    this.state = {
      page: 1, // 页码数
      pageSize: 2, // 每页显示的条数
      count: 0, // 总数量
      adminList: [],
      columns: [
        {
          title: '管理员名称',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '权限',
          dataIndex: 'authority',
          key: 'authority'
        },
        {
          title: '操作',
          key: 'action',
          render: (record) => (
            <Popconfirm 
              placement='top'
              title='是否确定删除该记录'
              onConfirm={ (record) => {
                this.delRecord(record._id)
              }}
              onCancel={ () => {
                message.error('取消删除')
              }}
              onText='确认'
              cancelText='取消'
            >
              <Button type='danger'>删除</Button>
            </Popconfirm>
          )
        }
      ]
    }
  }
  /* 刷新页面数据 */
  refreshList = async () => {
    const result = await AdminApi.administratorList()
    if (result.code === 1) {
      this.setState({ adminList: result.list })
    }
  }
  /* 页面挂载后请求数据，初始化页面 */
  componentDidMount () {
    this.refreshList()
  }
  /* 删除一条管理员数据 */
  delRecord = async (_id) => {

  }
  render() {
    const { columns, adminList } = this.state /* page, pageSize, count,  */
    return (
      <div>
        <Card title='管理员列表'>
          <Table columns={columns} dataSource={adminList} rowKey='_id'/> {/* pagination={ false } */}

          {/* 自定义的分页器 */}
          {/* <Pagination current={page} total={count} pageSize={pageSize}
            onChange={() => {
              // 只要页码数发生改变就会触发
              this.setState({page}, () => {
                this.refreshList()
              })
            }}/> */}
        </Card>
      </div>
    )
  }
}
