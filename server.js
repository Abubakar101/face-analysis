const express = require("express");
const bodyParser = require("body-parser");

// Initialize the app
const app = express();
const routes = require("./api/facePlus/faceplusRoutes")

// Middlewares
app.use(bodyParser.json());
app.use(routes);
// Set the port, either from an environmental variable or manually
const port = process.env.PORT || 8080;

// Listening on Port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Index route!
// app.get("/", (req, res) => {
//   console.log("Testing");
// });
