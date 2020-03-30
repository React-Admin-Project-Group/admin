import React, { Component } from 'react';
import style from './index.module.less'
import { Card, message, Table, Button, Popconfirm } from 'antd';
import navListApi from '../../../api/navList'
class NavList extends Component {
    state = {
        list: [],//列表数据
        columns: [
            { title: '_id', dataIndex: '_id', key: '_id' },
            { title: '类别', dataIndex: 'kind_name', key: 'kind_name' },
            {
                title: '修改', render:(record)=> {
                    return (
                        <Button type='primary' size='small' onClick={() => {
                            // 跳转到修改页面 传递当前的id
                            this.props.history.replace('/admin/main/cookbook/menuupdate/'+record._id)
                        }}>修改</Button>
                    )
                }
            },
            {
                title: '删除', render:(record)=> {
                    return (
                            <Button type='danger' size='small' onClick={()=>{
                                this.delKinds(record._id)
                            }}>删除</Button>
                    )
                }
            }
        ]
    }
    //获取商品数据
    componentDidMount() {
        this.getListData()
    }
    //删除分类
    delKinds = async (_id) => {
        let {code,msg} = await navListApi.del(_id)
        if(!code){return message.error(msg)}
        this.getListData()
    }
    getListData = async () => {
        let { code, list, msg } = await navListApi.list()
        if (code !== 1) { return message.error(msg) }
        this.setState({ list })
    }
    render() {
        let { list, columns } = this.state
        return (
            <div className={style.box}>
                <Card title='分类管理列表' className={style.card}>
                    <Button type='primary' onClick={()=>{
                        console.log(this)
                        this.props.history.push('/admin/main/cookbook/menuadd')
                    }}>添加菜谱类别</Button>
                    <Table scroll={{y:400,x:600}} columns={columns} dataSource={list} rowKey='_id'></Table>
                </Card>
            </div>
        )
    }
}

export default NavList;