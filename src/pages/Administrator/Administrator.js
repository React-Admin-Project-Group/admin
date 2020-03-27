import React, { Component } from 'react'
import { Popconfirm, Button, Card, Table, message, Modal, Form, Input, Radio, Tag} from 'antd'
import AdminApi from '../../api/adminApi'
import Style from './administrator.module.less'
export default class Administrator extends Component {
  constructor () {
    super()
    this.state = {
      page: 1, // 页码数
      pageSize: 2, // 每页显示的条数
      count: 0, // 总数量
      adminList: [],
      visible: false, // 添加管理员的模态框显示状态
      columns: [
        {
          title: '管理员名称',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '权限',
          dataIndex: 'authority',
          key: 'authority',
          render: (record) => {
            let obj = { 1: { color: 'green', msg: '超级管理员'}, 0: { color: 'orange', msg: '普通管理员'}}
          return (<Tag color={obj[record].color}>{obj[record].msg}</Tag>)
          }
        },
        {
          title: '操作',
          key: 'action',
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
    console.log('_id', _id)
    const result = await AdminApi.administratorDel(_id)
    console.log(result)
    const { code, msg } = result
    if (code !== 1) {
      message.error(msg)
    } else {
      message.success(msg)
      this.refreshList()
    }
  }

  /* 添加管理员 */
  onFinish = (values) => {
    console.log('Success:', values)
    const { username, password, authority } = values

    AdminApi.administratorAdd({ username, password, authority })
      .then(res => {
        this.setState({
          visible: false
        })
        message.success(res.msg)
        this.refreshList()
      })
      .catch(err => {
        console.log(err)
      })
  }
  onFinishFailed = () => {

  }
  handelCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { columns, adminList, visible } = this.state /* page, pageSize, count,  */
    return (
      <div className={Style.administrator}>
        <Card title='管理员列表'>
          <Button type='primary'
            onClick = { () => {
              this.setState({
                visible: true
              })
            }
          }
           >添加管理员</Button>
          <Table columns={columns} dataSource={adminList} rowKey='_id'/> {/* pagination={ false } */}

          {/* 自定义的分页器 */}
          {/* <Pagination current={page} total={count} pageSize={pageSize}
            onChange={() => {
              // 只要页码数发生改变就会触发
              this.setState({page}, () => {
                this.refreshList()
              })
            }}/> */}
              <Modal 
                title='添加管理员'
                visible={visible}
                getContainer = {false}
                onCancel = { this.handelCancel }
                footer={null}
              >
                <Form
                  name="basic"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                    label="管理员名称"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '输入管理员名称',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="管理员密码"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!'
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item 
                    name="authority"
                    label="管理员类型"
                  >
                    <Radio.Group value={0} defaultValue={0} onChange={(e) => {
                      console.log(e.target.value)
                    }}>
                      <Radio value={0}>普通管理员</Radio>
                      <Radio value={1}>超级管理员</Radio>
                    </Radio.Group>
                  </Form.Item>  
                  <Form.Item style={{'textAlign' : 'center'}}>
                    <Button type="primary" htmlType="submit">
                      提交
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
        </Card>
      </div>
    )
  }
}
