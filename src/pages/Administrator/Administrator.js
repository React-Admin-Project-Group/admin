import React, { Component } from 'react'
import { Popconfirm, Button, Card, Table, message, Tag, Pagination, Spin} from 'antd'
import AdminApi from '../../api/adminApi'
import Style from './administrator.module.less'
import XLSX from 'xlsx'
import AddForm from './components/AddForm'
export default class Administrator extends Component {
  constructor () {
    super()
    this.state = {
      page: 1, // 页码数
      pageSize: 5, // 每页显示的条数
      count: 0, // 总数量
      adminList: [],
      spinning: true,
      visible: false, // 添加管理员的模态框显示状态
      columns: [
        {
          title: '管理员名称',
          dataIndex: 'username',
          key: 'username',
          width: '35%'
        },
        {
          title: '权限',
          dataIndex: 'authority',
          key: 'authority',
          width: '30%',
          render: (record) => {
            let obj = { 1: { color: 'green', msg: '超级管理员'}, 0: { color: 'orange', msg: '普通管理员'}}
            return (<Tag color={obj[record].color}>{obj[record].msg}</Tag>)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: '35%',
          align: 'center',
          render: (record) => (
            <Popconfirm 
              placement='top'
              title='是否确定删除该记录'
              onConfirm={ () => {
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
    this.setState({ spinning: true })
    const { page, pageSize } = this.state
    /* const result = await AdminApi.administratorList(page, pageSize)
    if (result.code === 1) {
      this.setState({ adminList: result.list, count: result.count})
    } */
    AdminApi.administratorList(page, pageSize)
      .then(result => {
        if (result.code === 1) {
          this.setState({ adminList: result.list, count: result.count, spinning: false})
        } else {
          message.error(result.msg)
        }
      })
      .catch(err => {
        message.error('获取数据失败，请检查网络')
      })
    
  }
  /* 页面挂载后请求数据，初始化页面 */
  componentDidMount () {
    this.refreshList()
  }
  /* 删除一条管理员数据 */
  delRecord = async (_id) => {
    const result = await AdminApi.administratorDel(_id)
    const { code, msg } = result
    if (code !== 1) {
      message.error(msg)
    } else {
      message.success(msg)
      this.refreshList()
    }
  }
  /* 控制添加管理员弹窗的显示隐藏 */
  toggleAddForm =  (show = false) => {
    this.setState({
      visible: show
    })
  }
  render() {
    const { columns, adminList, visible, page, pageSize, count } = this.state 
    return (
      <div className={Style.administrator}>
        <Card title='管理员列表'>
          <Button type='primary' onClick = { this.toggleAddForm.bind(this, true)}>添加管理员</Button>
          {/* 加载图标 */}
          <Spin size="large" spinning={this.state.spinning}>
            <Table
              columns={columns}
              dataSource={adminList}
              rowKey='_id'
              pagination={ false }
              className={Style.tableWrapper}
            />
          </Spin>
          {/* 表格底部分页加导出按钮 */}
          <div className={Style.bottomControl}>
            {/* 自定义的分页器 */}
            <Pagination
              current={page}
              total={count}
              pageSize={pageSize}
              className={Style.paginationWrapper}
              onChange={(page) => {
                // 只要页码数发生改变就会触发
                this.setState({page}, () => {
                  this.refreshList()
                })
              }}/>
              <div className={Style.buttonWrapper}>
                <Button type='ghost'
                  className={Style.export_btn}
                  onClick={() => {
                    let exportData = []
                    let header = []
                    for (let item of columns) {
                      if (!(item.key === 'action')) {
                        header.push(item.title)
                      }
                    }
                    exportData.push(header)
                    for (let item of adminList) {
                      exportData.push([item.username, item.authority === 0 ? '普通管理员' : '超级管理员'])
                    }
                    let wb = XLSX.utils.book_new()
                    let ws =XLSX.utils.aoa_to_sheet(exportData)
                    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
                    XLSX.writeFile(wb, '管理员数据.xlsx', { compression: true })
                  }}
                >导出当前数据</Button>
                {/* <Button className={Style.export_btn}>导出所有</Button> */}
              </div>
          </div>
          
          {/* 添加管理员窗体 */}
          <AddForm visible={visible} refreshList= {this.refreshList} toggleAddForm={this.toggleAddForm}/>
         
        </Card>
      </div>
    )
  }
}
