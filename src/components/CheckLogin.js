import React, { Component, Fragment } from 'react'
import getToken from '../utils/getToken'
import { connect } from 'react-redux'
import ActionCreator from '@store/actionCreator'
import { bindActionCreators } from 'redux'
class CheckLogin extends Component {
  render() {
    const token = getToken()
    if (token) {
      this.props.CHANGE_LOGIN_STATE(true)
    } else {
      this.props.CHANGE_LOGIN_STATE(false)
    }
    return (
      <Fragment>
        { this.props.children }
      </Fragment>
    )
  }
}

export default connect(state => state, dispatch => {
  return bindActionCreators(ActionCreator, dispatch)
})(CheckLogin)