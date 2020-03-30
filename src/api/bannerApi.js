import tokenAxios from '../utils/tokenAxios'
import getToken from '../utils/getToken'
class BannerApi {
    //获取广告列表数据
    bannerlist (page, pageSize){
        const url = `/kitchen/banner?page=${page}&pageSize=${pageSize}`
        return tokenAxios.get(url)
    }

    //删除
    bannerdelete (_id) {
        const url = '/kitchen/banner/delete'
        return tokenAxios.delete(url,{data:{_id}})
    } 

    //添加
    banneradd (banner){
        const url = '/kitchen/banner'
        return tokenAxios.post(url,banner)
    }

    //通过id查询的当前那条数据
    findOne(_id){
        const url = '/kitchen/banner/findOne'
        return tokenAxios.get(url,{params:{_id}})
    }
    
    //修改
    bannerupdata (payload){
        const url = '/kitchen/banner'
        return tokenAxios.put(url, payload)
    }
}

export default new BannerApi()