// import axios from '../utils/axios'
import tokenAxios from '../utils/tokenAxios'
import getToken from '../utils/getToken'
class AdminApi {
  /* 管理员登录 */
  adminLogin (username, password) {
    const url = '/kitchen/admin'
    return tokenAxios.post(url, { username, password })
  }
  /* 获取管理员列表数据 */
  administratorList () {
    const url = '/kitchen/admin'
    return tokenAxios.get(url)
  }

  /* 删除管理员数据 */
  administratorDel (_id) {
    const url = '/kitchen/admin/delete'
    const loginInfo = getToken()
    let token = ''
    if (loginInfo) {
      token = loginInfo.token || 'no token'
    } else {
     token = 'no token'
    }
    return tokenAxios.delete(url, { data: { _id , token}})
  }

  /* 添加管理员 */
  administratorAdd (payload) {
    const url = '/kitchen/admin'
    return tokenAxios.put(url, payload)
  }
}

export default new AdminApi()