// import axios from '../utils/axios'
import tokenAxios from '../utils/tokenAxios'
import getToken from '../utils/getToken'
class AdminApi {
  /* 获取菜谱大类列表数据 */
  getMenuKinds () {
    const url = '/kitchen/kinds'
    return tokenAxios.get(url)
  }
  /* 获取菜谱子类列表数据 */
  getMenuType () {
    const url = `/kitchen/menu`
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