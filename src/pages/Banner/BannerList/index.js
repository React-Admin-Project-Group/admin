import React, {Component}  from 'react'
// import style from 'index.module.less'
import {Card, Table, Button, Spin, message, Pagination, Popconfirm, Modal, notification } from 'antd'
import bannerApi from '../../../api/bannerApi'

class BannerList extends Component{
    state = {
        page: 1, // 页码数
        pageSize: 5, // 每页显示的条数
        count: 0, // 总数量
        visible:false,
        dataSource:[],
        spinning:false,
        columns:[
            {
              title: '_id',
              dataIndex: '_id',
              key: '_id',
            },
            {
              title: 'ID',
              dataIndex: 'banner_id',
              key: 'banner_id',
            },
            {
                title: 'name',
                dataIndex: 'banner_name',
                key: 'banner_name',
            },
            {
              title: 'type',
              dataIndex: 'banner_type',
              key: 'banner_type',
            },
            {
                title:'操作',
                key:'action',
                render:(recode)=>{
                    return(
                        <div>
                            {/* 删除 */}
                            <Popconfirm title='你确定要删除该商品嘛?'
                             onConfirm={()=>{this.delBanner(recode._id)}}
                            >
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                            <span>¤</span>
                            {/* 修改 */}
                            <Popconfirm title='你确定要修改该商品嘛?'
                             onClick={()=>{
                                 //跳转到修改的页面,传递要修改的id
                                 console.log(this)
                                 this.props.history.replace('/admin/main/banner/amend/'+recode._id)
                             }}
                            >
                            <Button type='primary' size='small'>修改</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
          ]
    }
    //和模态框里面的数据做关联
    handleOk= async ()=>{
        //获取输入内容
        let banner_id = this.refs.id.value
        let banner_name = this.refs.name.value
        let banner_type = this.refs.type.value
        //调添加接口
        let result = await bannerApi.banneradd({ banner_id, banner_name, banner_type })
        console.log(result)
        if(result.code !==1){return notification.error({description:'广告添加失败',message:'错误',duration:1.5})}
        console.log(result.code)
        //关闭模态框
        this.setState({visible:false})
        //刷新页面
        this.getBannerList()
    }
    //控制模态框的关闭
    handleCancel=()=>{
        this.setState({visible:false})
    }
    //删除商品
    delBanner=async (_id)=>{
        let result = await bannerApi.bannerdelete(_id)
        if(result.code !== 1){return message.error(result.msg)}
        //刷新页面
        this.getBannerList()
        console.log(1)
        
    }
    //获取广告的列表数据
    getBannerList =async ()=>{
        this.setState({spinning:true})
        const {page, pageSize} = this.state
        let result = await bannerApi.bannerlist(page, pageSize)
        .then((result)=>{
            // console.log(result)
            if(result.code === 1){
                this.setState({dataSource:result.list,spinning:false,count:result.count})
            }else{
                message.error(result.msg)
            }
        })
        .catch((err)=>{
                message.error('获取数据失败，请检查网络')
        })
    }
    //页面挂载渲染列表数据
    componentDidMount(){
        this.getBannerList()
    }
    render(){
        let { spinning, dataSource, columns, page, pageSize, count, visible } = this.state
        return(
            <div>
                <Card title='广告管理列表' >
                <Button type="primary" onClick={()=>{
                    this.setState({visible:true})
                    }}>添加</Button>
                <Spin spinning={spinning}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='_id'></Table>
                </Spin>
             {/* 分页器 */}
            <Pagination  current={page} total={count} showQuickJumper pageSize={pageSize}
                onChange={(page,pageSize)=>{
                //只要页码数发生改变就会触发          
                this.setState({page},()=>{
                    this.getBannerList()
                })   
                }}
                />
            </Card>
            {/* 添加的模态框 */}
                <Modal
                title="管理员添加"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
               <span>id:</span><br/><input type="text" ref='id'/><br/>
               <span>名字:</span><br/><input type="text" ref='name'/><br/>
               <span>类型:</span><br/><input type="text" ref='type'/><br/>
            </Modal>
        </div>
        )
    }
}

export default BannerList