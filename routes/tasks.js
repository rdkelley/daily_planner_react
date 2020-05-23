const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const config = require("../config/keys");

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,

    // This is the same as issuer (see below),
    // with '.well-known/jwks.json' added to the end of it (after the last slash)
    jwksUri: `https://dev-56k7k0fp.auth0.com/.well-known/jwks.json`,
  }),

  // Audience comes from your API setup on the
  // Auth0 website (APIs => click the API you setup... not the Management API)
  // The "Identifier" can be plugged in as the audience string here
  audience: config.auth0Audience,

  // The issuer comes from the Application setup on the Auth0 website (Applications => click your app)
  // The issuer is the same as the Domain field
  issuer: `https://dev-56k7k0fp.auth0.com/`,
  algorithms: ["RS256"],
});

module.exports = (app) => {
  app.get("/tasks", checkJwt, (req, res) => {
    // checkJwt adds user info to the request object 
    console.log(req.user);

    res.send("This worked!");
  });
};
