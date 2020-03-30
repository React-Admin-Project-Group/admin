import React, { Component } from 'react'
import { Card, Button,message} from 'antd'
import style from './index.module.less'
import MenuAddApi from '../../../api/navList'
class MenuUpdate extends Component {
    state = {
        "kind_name": ""
    }
 
    async componentDidMount(){
        //  获取id
        let {_id}=this.props.match.params
        //  获取列表信息
        let {list} = await MenuAddApi.list()
        // 通过id 获取修改信息
        let result=await MenuAddApi.findOne(_id)
        console.log(result)
        this.setState({types:list})

        
    }
    submit = async () => {
        let { kind_name} = this.state
        let result = await MenuAddApi.add(kind_name)
        let {code,msg}=result
        if(code!==1){return message.error(msg='该类别已存在')}
        this.props.history.replace('/admin/main/cookbook/add')
        if(code){return message.info(msg)}
    }
    // 取消方法
    cancel(){
        this.props.history.replace('/admin/main/cookbook/add')
    }
    render() {
        let { kind_name ,msg} = this.state
        return (
            <div className={style.box}>
                <Card title='菜谱类别添加'>
                    类别：<input type='text' value={kind_name} onChange={(e) => {
                        this.setState({ kind_name: e.target.value })
                    }}></input><br />
                    <Button onClick={() => {
                        this.cancel()
                    }} className={style.button}>取消</Button>
                    <Button onClick={() => {
                        this.submit()
                    }} className={style.button} type='primary'>添加</Button>

                </Card>
            </div>
        )
    }
}
export default MenuUpdate