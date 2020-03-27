// import axios from '../utils/axios'
import tokenAxios from '../utils/tokenAxios'
class AdminApi {
  
  /* 获取管理员列表数据 */
  administratorList () {
    const url = '/kitchen/admin'
    return tokenAxios.get(url)
  }

  /* 删除管理员数据 */
  administratorDel (_id) {
    const url = '/kitchen/delete'
    return tokenAxios.delete(url, { data: { _id }})
  }

}

export default new AdminApi()