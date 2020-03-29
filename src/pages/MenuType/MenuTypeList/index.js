import React, { Component } from 'react';
import style from './index.module.less';
import menuTypeApi from '../../../api/menuTypeApi';
import {Card,Button,Popconfirm,Tabs, Table, message} from 'antd';
const { TabPane } = Tabs;
let rootPath = 'http://localhost:3000';
class MenuType extends Component {
    state = {
        dataList:[],
        kindsList:[],
        typeList:[],
        idList:[],
        mode:'left',
        columns:[
            {title: 'id',dataIndex: '_id',key: '_id',width:150},
            {title: '菜谱类别',dataIndex: 'menu_name',key: 'menu_name',width:150},
            {title: '菜谱图片',dataIndex: 'menu_path',key: 'menu_path',width:150,render(menu_path){
                return(
                    <img src={rootPath+menu_path} alt="菜谱图片" style={{width:80,height:80}}/>
                )
            }},
            {title:'操作',key:'action',width:150,render:(record)=>{
                return(
                    <div>
                        <Button style={{marginLeft:2}} type='primary' size='small' onClick={()=>{
                            console.log(record)
                            // this.props.history.push('/admin/goodsUpdate?'+record._id);
                        }}>修改</Button>
                        <Popconfirm
                        title="您确定要删除该菜谱类别吗？"
                        onConfirm={()=>{
                            console.log(record)
                            // this.del(record._id);
                        }}
                        okText="Yes"
                        cancelText="No">
                            <Button style={{marginLeft:2}} type='danger' size='small'>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }}
        ]
    }
    getKindsList = async ()=>{
        let {code,msg,list} = await menuTypeApi.getMenuKinds();
        if(code !== 1) {
            return message.error(msg)
        }
        let {idList,typeList} = this.state;
        let obj = {};
        list.map((item)=>{
            let arr = item.child_kinds.join(',').split(',');
            obj[item.kind_name] = [];
            return arr.map((typeItem)=>{
                if(idList.indexOf(typeItem) !== -1) {
                    let index = idList.indexOf(typeItem);
                    // console.log(index)
                    return obj[item.kind_name].push(typeList[index]);
                }else {
                    return false
                }
            })
        })
        // console.log(obj)
        let dataList = [];
        for (const key in obj) {
            if(obj[key].length !== 0) {
                dataList.push({name:key,typeList:obj[key]});   
            }
        }
        this.setState({dataList:dataList,kindsList:list})
        // console.log(this.state.dataList,this.state.kindsList,this.state.typeList);
    }
    getTypeList = async ()=>{
        let idList = [];
        let {code,msg,list} = await menuTypeApi.getMenuType();
        if(code !== 1) {
            return message.error(msg)
        }
        list.map((item)=>{
            return idList.push(item['_id']);
        })
        this.setState({idList:idList,typeList:list},()=>{
            this.getKindsList();
        });
    }
    componentDidMount(){
        // this.getKindsList();
        this.getTypeList();
    }
    render() { 
        let {dataList,mode,columns} = this.state;
        return (
            <div className={style.box}>
                <Card title='菜谱子类列表' className={style.card}>
                    <Button type='primary' onClick={()=>{
                        this.props.history.push('/admin/main/menuTypeAdd');
                    }}>添加</Button>
                    <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 600, marginTop:50 }}>
                        {dataList.map((item,index)=>{
                            return(
                                <TabPane tab={item.name} key={index}>
                                    <Table scroll={{y:400,x:700}} columns={columns} pagination={true} dataSource={item.typeList} rowKey='_id'></Table>
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </Card>
            </div>
        );
    }
}
 
export default MenuType;