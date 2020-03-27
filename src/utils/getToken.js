function getToken () {
  try {
    const loginInfo= localStorage.getItem('loginInfo')
    if (loginInfo) {
      return JSON.parse(loginInfo)
    }
  } catch (e) {
    console.log('获取本地存储登录信息失败')
    return {}
  }
}

export default getToken