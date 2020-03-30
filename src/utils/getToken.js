function getToken () {
  try {
    let loginInfo= localStorage.getItem('loginInfo')
    if (loginInfo) {
      return JSON.parse(loginInfo)
    } else {
      loginInfo = sessionStorage.getItem('loginInfo')
      if (loginInfo) {
        return JSON.parse(loginInfo)
      } else {
        throw new Error()
      }
    }
  } catch (e) {
    console.log('获取本地存储登录信息失败')
    return ''
  }
}

export default getToken