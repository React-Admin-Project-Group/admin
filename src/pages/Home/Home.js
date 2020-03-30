import React, { Component } from 'react'
import { Card, Typography, Button, Spin, Table, Pagination, Popconfirm, message,  DatePicker   } from 'antd'
import Style from './Home.module.less'
import XLSX from 'xlsx'
import LogApi from '@api/logApi'
import {
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
const { Title } = Typography

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      page: 1, // 页码数
      pageSize: 5, // 每页显示的条数
      count: 0, // 总数量
      logList: [],
      spinning: true,
      visible: false, // 添加管理员的模态框显示状态
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      startTime: '',
      endTime: '',
      createTime: '',
      ip: '0.0.0.0',
      loginCount: 0,
      columns: [
       /*  {
          title: '用户名',
          dataIndex: 'user_id',
          key: 'user_id',
          align: 'center',
          width: '15%'
        }, */
        {
          title: '内容',
          dataIndex: 'log',
          key: 'log',
          align: 'center',
          width: '40%'
        },
        {
          title: '时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: '25%',
          align: 'center',
          render: (record) => {
            let times = record.split('T')
            return times[0] + ' ' + times[1].slice(0, times[1].length - 5)
          }
        },
        {
          title: '客户端IP',
          dataIndex: 'ip',
          key: 'ip',
          width: '20%',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: '15%',
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
              {/* <Button type='danger'>删除</Button> */}
              <DeleteOutlined />
            </Popconfirm>
          )
        }
      ]
    }
  }
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  /* 刷新页面数据 */
  refreshList = async () => {
    this.setState({ spinning: true })
    const { page, pageSize, startTime, endTime } = this.state
    LogApi.logList(page, pageSize, startTime, endTime)
      .then(result => {
        if (result.code === 1) {
          this.setState({ logList: result.list, spinning: false , count: result.count})
        } else {
          message.error(result.msg)
        }
      })
      .catch(err => {
        message.error('获取数据失败，请检查网络')
      })
    
  }
  filterList = async () => { 
    const { startTime, endTime } = this.state
    if (startTime && endTime) {
      this.setState({
        startTime,
        endTime
      }, ()=> {
        this.refreshList()
      })
    } else {
      message.warning('请选择开始和结束日期')
      this.setState({
        startTime: '',
        endTime: ''
      })
      this.refs.datePic.focus()
    }
  }
  lastLogin = async () => {
    LogApi.lastLogin()
      .then(res => {
        const { last, count } = res
        const { createTime, ip } = last
        this.setState({
          createTime,
          ip,
          loginCount: count
        })
      })
      .catch(err => {
        message.error('获取上一次登录信息有误')
      })
  }
  /* 页面挂载后请求数据，初始化页面 */
  componentDidMount () {
    this.lastLogin()
    this.refreshList()
  }
  /* 删除一条管理员数据 */
  delRecord = async (_id) => {
    const result = await LogApi.logDel([_id])
    const { code, msg } = result
    if (code !== 1) {
      message.error(msg)
    } else {
      message.success(msg)
      this.refreshList()
    }
  }
  /* 批量删除管理员数据 */
  batchDelRecord = async () => { 
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      return message.warning('请至少选择一条记录')
    } else {
      const result = await LogApi.logDel(selectedRowKeys)
      const { code, msg } = result
      if (code !== 1) {
        message.error(msg)
      } else {
        message.success(msg)
        this.setState({selectedRowKeys: []})
        this.refreshList()
      }
    }
  }
  onChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }
  onOk = (value) => {
    console.log('onOk: ', value);
  }

  render() {
    const { columns, logList, page, pageSize, count, selectedRowKeys, loginCount, createTime, ip } = this.state 
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className={Style['home-container']}>
        <Card>
          <Title level={3}>欢迎使用下厨房后台管理系统</Title>
          <p>登录次数: <span>{loginCount}</span></p>
          <p>上次登录ip: <span>{ip}</span> 上次登录时间: <span>{createTime}</span></p>
          
          {/* 表格头部信息 */}
          <div className={Style.searchWrapper}>
            <Button type='danger' className={Style.leftDelBtn} onClick = {this.batchDelRecord}>
              <DeleteOutlined />
              批量删除
            </Button>
            <RangePicker
              /* showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm" */
              locale={locale}
              onChange={this.onChange}
              onOk={this.onOk}
              showToday={true}
              ref='datePic'
            />
            <Button type='primary' className={Style.rightSearchBtn} onClick={this.filterList}>
              <SearchOutlined />
              搜日志
            </Button>
          </div>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          {/* 加载图标 */}
          <Spin size="large" spinning={this.state.spinning}>
            <Table
              columns={columns}
              dataSource={logList}
              rowKey='_id'
              pagination={ false }
              className={Style.tableWrapper}
              rowSelection={rowSelection}
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
              {/* 导出数据到本地 */}
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
                    for (let item of logList) {
                      exportData.push([item.log, item.createTime, item.ip])
                    }
                    // console.log(exportData)
                    let wb = XLSX.utils.book_new()
                    let ws =XLSX.utils.aoa_to_sheet(exportData)
                    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
                    XLSX.writeFile(wb, '管理员数据.xlsx', { compression: true })
                  }}
                >导出当前数据</Button>
              </div>
          </div>
          
        </Card>
      </div>
    )
  }
}
