// import axios from '../utils/axios'
import tokenAxios from '../utils/tokenAxios'
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

  /* 添加子类菜谱 */
  addTypes (data) {
    const url = '/kitchen/menu'
    return tokenAxios.post(url,data)
  }
  /* 向大类中添加子类菜谱 */
  addKinds (payload) {
    const url = '/kitchen/kinds/add'
    return tokenAxios.put(url,payload)
  }
  /* 从大类中删除子类 */
  removeFromKinds (_id,child_id) {
    const url = '/kitchen/kinds/del'
    return tokenAxios.delete(url, {data:{_id,child_id}})
  }
  /* 删除子类 */
  deleteType (_id) {
    const url = '/kitchen/menu'
    return tokenAxios.delete(url, {data:{_id}})
  }
  /* 修改子类 */
  updateType (payload) {
    const url = '/kitchen/menu'
    return tokenAxios.put(url,payload)
  }
}

export default new AdminApi()