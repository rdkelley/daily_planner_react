const axios = require("axios");

class auth0Client {
  initAuth0 = () =>
    new Promise((resolve, reject) => {
      axios({
          method: "POST",
          url: "https://dev-56k7k0fp.auth0.com/oauth/token",
          body: {
            client_id: "0tpOcyL7Y7dr1RBDPgOUhYjVdY2VW2jw",
            client_secret:
              "bg8ph88bAjrcPVfv31jpHp76s_RM4K_u299bKATO_8YwDgoUCCtLZT8Pej14CbSJ",
            audience: "https://dev-56k7k0fp.auth0.com/api/v2/",
            grant_type: "client_credentials",
          },
          headers: { "content-type": "application/json" },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
          
          console.log(e.response.status);
          console.log(e.response.statusText);
        });
    });

  getAllUsers = async () => {
    this.initAuth0();
  };
}

module.exports = new auth0Client();
