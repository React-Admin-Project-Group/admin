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
    alter(_id){
        let url='/kitchen/kinds'
        return tokenAxios.put(url,{data:{_id}})
    }
    findOne(_id){
        let url='/kitchen/kinds/'+_id
        return tokenAxios.get(url)
    }
    
}
export default new NavListApi()