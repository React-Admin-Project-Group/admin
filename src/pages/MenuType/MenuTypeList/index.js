import React, { Component } from 'react';
import style from './index.module.less';
import menuTypeApi from '../../../api/menuTypeApi';
import {Card,Button,Popconfirm,Tabs, Table, message, Modal, Input} from 'antd';
import imgUpload from '../../../api/imgUpload';
// import MenuTypeUpdate from '../TypeUpdate';
const { TabPane } = Tabs;
// let routerPath = 'http://localhost:3000';
let routerPath = 'http://114.215.148.3:3000';
class MenuType extends Component {
    state = {
        dataList:[],
        kindsList:[],
        typeList:[],
        idList:[],
        mode:'left',
        visible: false,
        _id: '',
        menu_name: '默认名字',
        menu_path: '',
        columns:[
            {title: 'id',dataIndex: '_id',key: '_id',width:150},
            {title: '菜谱类别',dataIndex: 'menu_name',key: 'menu_name',width:150},
            {title: '菜谱图片',dataIndex: 'menu_path',key: 'menu_path',width:150,render(menu_path){
                return(
                    <img src={routerPath+menu_path} alt="菜谱图片" style={{width:80}}/>
                )
            }},
            {title:'操作',key:'action',width:150,render:(record)=>{
                return(
                    <div>
                        <Button style={{marginLeft:2}} type='primary' size='small' onClick={()=>{
                            // console.log(record)
                            // this.props.history.push('/admin/goodsUpdate?'+record._id);
                            this.showModal(record)
                        }}>修改</Button>
                        <Popconfirm
                        title="您确定要删除该菜谱类别吗？"
                        onConfirm={()=>{
                            this.del(record);
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
    upload = async ()=>{
        let file = this.refs.img.files[0]
        if(!file) {
            return message.error('请先选择一张图片')
        }
        let {size,type} = file
        let types = ['jpg', 'gif', 'png', 'jpeg', 'webp']
        if(size>1000000) {
            return message.warning('图片尺寸超过1M')
        }
        if(types.indexOf(type.split('/')[1]) === -1) {
            return message.warning('图片类型只允许为jpg,jpeg,gif,png,webp')
        }
        let formData = new FormData();
        formData.append('img',file);
        let {code,msg,path} = await imgUpload.imgUpload(formData);
        if(code !== 1) {
            return message.error(msg);
        }
        this.setState({menu_path:path});
    }
    addTypes = async ()=>{
        if(!this.state.menu_path) {
            return message.info('请先上传图片');
        }
        let {_id,menu_name,menu_path} = this.state
        console.log(111,_id,menu_name,menu_path)
        let {code,msg} = await menuTypeApi.updateType({_id,menu_name,menu_path});
        if(code !== 1) {
            return message.error(msg);
        }
        message.success('菜谱子类修改成功');
        this.hideModal()
        this.getTypeList()
    }
    showModal = (record) => {
        let {_id,menu_name,menu_path} = record;
        this.setState({ visible: true,_id,menu_name,menu_path});
    };
    
    hideModal = () => {
        this.setState({visible: false});
      };
    del = async (infos)=>{
        let {_id,Fid,Fname} = infos
        console.log(_id,Fid,Fname)
        let {code,msg} = await menuTypeApi.removeFromKinds(Fid,_id)
        if(code !== 1) {
            return message.error(msg)
        }
        let result = await menuTypeApi.deleteType(_id)
        if(result.code !== 1) {
            return message.error(msg)
        }
        message.success('删除成功')
        this.getTypeList()
    }
    getKindsList = async ()=>{
        let {code,msg,list} = await menuTypeApi.getMenuKinds();
        if(code !== 1) {
            return message.error(msg)
        }
        let {idList,typeList} = this.state;
        let obj = {};
        list.map((item)=>{
            // console.log(Object.prototype.toString.call(item.child_kinds) === '[object Array]');
            if(Object.prototype.toString.call(item.child_kinds) !== '[object Array]') {return false}
            let arr = item.child_kinds.join(',').split(',');
            obj[item.kind_name] = [];
            return arr.map((typeItem,i)=>{
                if(idList.indexOf(typeItem) !== -1) {
                    let index = idList.indexOf(typeItem);
                    typeList[index].Fid=item['_id']
                    typeList[index].Fname=item['kind_name']
                    return obj[item.kind_name].push(typeList[index]);
                }else {
                    return false
                }
            })
        })
        // console.log('obj',obj)
        let dataList = [];
        for (const key in obj) {
            if(obj[key].length !== 0) {
                dataList.push({name:key,typeList:obj[key]});   
            }
        }
        this.setState({dataList:dataList,kindsList:list})
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
    componentDidMount (){
        // this.getKindsList();
        this.getTypeList();
    }
    render() { 
        let {dataList,mode,columns,menu_name,menu_path} = this.state;
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
                                    <Table scroll={{y:400,x:700}} columns={columns} pagination={true} dataSource={item.typeList} rowKey='_id' ></Table>
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </Card>
                <Modal
                title='修改菜谱子类'
                visible={this.state.visible}
                onOk={this.addTypes}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="取消">
                    菜谱名称：<Input style={{ width: 220, marginBottom:30 }} size="large" type='text' value={menu_name} onChange={(e)=>{
                        this.setState({menu_name:e.target.value})
                    }} /><br/>
                    菜谱图片：
                    <input type="file" ref='img' style={{ width: 220, marginBottom:20 }}/>
                    <Button style={{marginLeft:20, marginTop:20}} type='default' onClick={this.upload}>上传图片</Button><br/>
                    <img height='140' style={{marginTop:30}} src={routerPath+menu_path} alt="菜谱图片" /><br/>
                </Modal>
            </div>
        );
    }
}
 
export default MenuType;