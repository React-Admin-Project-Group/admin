import React, {Component} from 'react'
import {Card, Input, Button, message} from 'antd'
import bannerApi from '../../../api/bannerApi'

class BannerAmend extends Component{
    state = {
        banner_name:'默认名字',
        banner_type:'默认类型'
    }
   
    async componentDidMount(){
        //获取id
        console.log(this)
        let {id} =  this.props.match.params
        //通过id获取修改信息
        // console.log(id)
        let {code,list} = await bannerApi.findOne(id)
        console.log(code,list)
        this.setState({banner_name:list.banner_name,banner_type:list.banner_type})
    }
    //修改商品
    submit= async ()=>{
        let {id} = this.props.match.params
        //调用修改的接口
        const { banner_name, banner_type } = this.state
        let result = await bannerApi.bannerupdata({_id: id, banner_name, banner_type })
        console.log(result)
        if(result.code !== 1){return message.error(result.msg)}
        message.success('修改成功')
        //修改成功跳转回广告列表页面
        this.props.history.replace('/admin/main/banner/list')
    }

    render(h) {
        let { banner_name ,banner_type} = this.state
        return(
            <div>
                <Card title='广告修改'>
                    <span>广告名字:</span><br/><Input placeholder={banner_name}  style={{width:'360px'}} onChange={(e)=>{
                        this.setState({banner_name:e.target.value})
                    }}/><br/><br/>
                    <span>广告类型:</span><br/><Input placeholder={banner_type}  style={{width:'360px'}} onChange={(e)=>{
                        this.setState({banner_type:e.target.value})
                    }}/><br/><br/>
                    <Button style={{marginLeft:'300px'}} type='primary' size='small' onClick={this.submit}>修改</Button>
                </Card>
            </div>
        )   
    }
}

export default BannerAmend