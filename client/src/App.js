import React, { useContext } from "react";
import { auth0Context } from "./contexts/auth0Context";

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useContext(
    auth0Context
  );

  return (
    <div className="App">
      <div>
        {!isLoading && !user && (
          <>
            <button onClick={loginWithRedirect}>Login</button>
          </>
        )}
        {!isLoading && user && (
          <>
            <h1>You are logged in!</h1>
            <p>Hello {user.name}</p>

            {user.picture && <img src={user.picture} alt="My Avatar" />}

            <div>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="button is-small is-dark"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
