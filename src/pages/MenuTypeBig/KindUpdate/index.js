import React, { Component } from 'react'
import { Card, Button,message} from 'antd'
import style from './index.module.less'
import MenuAddApi from '../../../api/navList'
class MenuUpdate extends Component {
    state = {
        "kind_name": "",
        "_id":""
    }
 
    async componentDidMount(){
        //  获取id
        let {_id}=this.props.match.params
        //  获取列表信息
        let {code,list} = await MenuAddApi.list()
        // 通过id 获取修改信息
        let result=await MenuAddApi.findOne(_id)
        this.setState({types:list})
    }
    // 修改方法
    alterAdd= async ()=>{
        let {_id}=this.props.match.params
        let {kind_name}=this.state
        if(kind_name!==''){
            let result =await MenuAddApi.alter({_id,kind_name})
            this.props.history.replace('/admin/main/cookbook/add')
        }else{
            message.error('修改的类别不能为空')
        }
    }
    // 取消方法
    cancel(){
        this.props.history.replace('/admin/main/cookbook/add')
        
    }
    render() {
        let { kind_name ,msg,_id} = this.state
        return (
            <div className={style.box}>
                <Card title='菜谱类别修改'>
                    类别：<input type='text' value={kind_name} onChange={(e) => {
                        this.setState({ kind_name: e.target.value })
                    }}></input><br />
                    <Button onClick={() => {
                        this.cancel()
                    }} className={style.button}>取消</Button>
                    <Button onClick={() => {
                        this.alterAdd()
                    }} className={style.button} type='primary'>修改</Button>

                </Card>
            </div>
        )
    }
}
export default MenuUpdate