/**
 * The code in this file is from this tutorial on Auth0's site:
 * https://auth0.com/blog/authenticating-your-first-react-app
 */
import React, { Component, createContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
require("dotenv").config();

export const auth0Context = createContext();

export class Auth0Provider extends Component {
  state = {
    auth0Client: null,
    isLoading: true,
    isAuthenticated: false,
  };

  config = {
    domain: "dev-56k7k0fp.auth0.com",
    client_id: "MwYED1Es19j5nIobgCRREb7I5TRT8un6",
    audience: "https://dailyplanner/api",
    redirect_uri: "http://localhost:3000/",
  };

  componentDidMount = () => {
    this.initAuth0();
  };

  initAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);

    this.setState({ auth0Client });

    // Check to see if they have been redirected after login
    if (window.location.search.includes("code=")) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;

    this.setState({ auth0Client, isLoading: false, isAuthenticated, user });
  };

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true });

    // Magically handles the callback
    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();

    this.setState({ user, isAuthenticated: true, isLoading: false });

    // Removes the "code=" portion of the url
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  render() {
    const { isLoading, isAuthenticated, user, auth0Client } = this.state;
    const { children } = this.props;

    const authConfig = {
      isLoading,
      isAuthenticated,
      user,
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      logout: (...p) => auth0Client.logout(...p),
    };

    return (
      <auth0Context.Provider value={authConfig}>
        {children}
      </auth0Context.Provider>
    );
  }
}
