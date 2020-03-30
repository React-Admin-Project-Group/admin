import {CHANGE_LOGIN_STATE } from './actionTypes'
export default {
  [CHANGE_LOGIN_STATE](state) {
    return {
      type: CHANGE_LOGIN_STATE,
      payload: state
    }
  }
}