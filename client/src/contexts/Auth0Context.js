import React, { Component, createContext } from 'react'
require('dotenv').config()

export default class Auth0Context extends Component {

  state = {
    auth0Client = null,
    isAuthenticated = false
  }

  config = {

  }

  initAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
