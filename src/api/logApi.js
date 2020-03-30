import tokenAxios from '../utils/tokenAxios'
import getToken from '../utils/getToken'

class logApi {
  /* 获取用户日志数据 */
  logList (page, pageSize, startTime, endTime) {
    const loginInfo = getToken()
    let user_id = ''
    if (loginInfo) {
      user_id = loginInfo._id
    } 
    const url = `/kitchen/log?page=${page}
    &pageSize=${pageSize}&user_id=${user_id}&startTime=${startTime}&endTime=${endTime}`
    return tokenAxios.get(url)
  }

  /* 删除用户的日志 */
  logDel (del_ids) {
    const url = '/kitchen/log'
    return tokenAxios.delete(url, { data: { del_ids }})
  }

  /* 获取用户上次登录 */
  lastLogin () {
    const url = '/kitchen/log/last'
    return tokenAxios.get(url)
  }
}

export default new logApi()