import React, { Component, Fragment } from 'react'
import { HashRouter, Switch } from 'react-router-dom'

import FrontedAuth from './FrontedAuth'
export default class PageRouter extends Component {
  render() {
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <FrontedAuth></FrontedAuth>
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}
