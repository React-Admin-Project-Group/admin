import React, { Component } from 'react';
import style from './index.module.less';
import menuTypeApi from '../../../api/menuTypeApi';
import imgUpload from '../../../api/imgUpload';
import { Card, Button, message, Input, } from 'antd';
// let routerPath = 'http://localhost:3000';
let routerPath = 'http://114.215.148.3:3000';
class MenuTypeAdd extends Component {
    state = {
        "menu_name":"默认名字",
        "menu_path":'',
        "kind":'',
        "types":[]
    }
    async componentDidMount(){
        let {code,msg,list} = await menuTypeApi.getMenuKinds();
        if(code !== 1) {
            return message.error(msg)
        }
        this.setState({types:list})
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
        let {menu_name,menu_path,kind} = this.state
        let result = await menuTypeApi.addTypes({menu_name,menu_path});
        let {code,msg} = result
        if(code !== 1) {
            return message.error(msg);
        }
        let {list} = result
        let child_id = list[0]['_id']
        let _id = kind
        let infos = await menuTypeApi.addKinds({_id,child_id})
        if(infos.code !== 1) {
            return message.error(infos.msg)
        }
        message.success('菜谱子类添加成功');
        this.props.history.replace('/admin/main/menuType');
    }
    render() { 
        let {menu_name,menu_path,kind,types} = this.state;
        return (
            <div className={style.box}>
                <Card title='菜谱子类别添加' className={style.card}>
                    <div className={style.Input}>
                        菜谱名称：<Input style={{ width: 420, marginBottom:30 }} size="large" type='text' value={menu_name} onChange={(e)=>{
                            this.setState({menu_name:e.target.value})
                        }} /><br/>
                        所属类别：<select value={kind} style={{ width: 150, marginBottom:20 }} onChange={(e)=>{
                            this.setState({kind:e.target.value});
                        }} >
                            {types.map((item)=>{
                                return(
                                    <option value={item._id} key={item._id} >{item.kind_name}</option>
                                )
                            })}
                        </select><br/>
                        菜谱图片：
                        <input type="file" ref='img' style={{ width: 260, marginBottom:20 }}/>
                        {/* <Input style={{ width: 260, marginBottom:20 }} type='file' size='large' ref='img' /> */}
                        <Button style={{marginLeft:20, marginTop:20}} type='default' onClick={this.upload}>上传图片</Button><br/>
                        <img width='80' height='90' src={routerPath+menu_path} alt="菜谱图片" /><br/>
                        <Button style={{marginLeft:80, marginTop:20}} type='primary' onClick={()=>{
                            this.addTypes();
                        }}>添加</Button>
                        <Button style={{marginLeft:80, marginTop:20}} type='primary' onClick={()=>{
                            this.props.history.goBack();
                        }}>返回</Button>
                    </div>
                </Card>
            </div>
        );
    }
}
 
export default MenuTypeAdd;