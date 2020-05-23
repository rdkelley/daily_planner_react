const express = require("express");
const authClient = require("./utils/auth0Client");
const taskRoutes = require("./routes/tasks");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require("./routes/tasks")(app);

app.listen(PORT, () => {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
