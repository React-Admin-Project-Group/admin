import state from './state.js'
import { CHANGE_LOGIN_STATE } from './actionTypes'

export default (prevState = state, actions) => {
  let newData = JSON.parse(JSON.stringify(prevState))

  let { type, payload } = actions
  switch (type) {
    case CHANGE_LOGIN_STATE: 
      newData.loginState = payload
      break
    default: break
  }

  return newData
}