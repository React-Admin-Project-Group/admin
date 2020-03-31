import {CHANGE_LOGIN_STATE, CHANGE_SKIN_COLOR } from './actionTypes'
export default {
  [CHANGE_LOGIN_STATE](state) {
    return {
      type: CHANGE_LOGIN_STATE,
      payload: state
    }
  },
  [CHANGE_SKIN_COLOR](state) {
    return {
      type: CHANGE_SKIN_COLOR,
      payload: state
    }
  }
}