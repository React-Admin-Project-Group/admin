import tokenAxios from '../utils/tokenAxios'
class NavListApi{
    list(){
        //http://114.215.148.3:3000/kinds
        let url='/kitchen/kinds'
        return tokenAxios.get(url)
    }
    del(_id){
        let url=`/kitchen/kinds`
        return tokenAxios.delete(url,{data:{_id}})
    }
    add(kind_name){
        let url=`/kitchen/kinds`
        return tokenAxios.post(url,{kind_name})
    }
    alter(payload){
        let url='/kitchen/kinds'
        return tokenAxios.put(url,payload)
    }
    findOne(_id){
        let url='/kitchen/kinds/findOne'
        return tokenAxios.get(url,{_id})
    }
    
}
export default new NavListApi()