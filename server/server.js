// Server from portfolio app
const path = require("path");
const express = require("express");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
// port is ... or http://127.0.0.1:3000/

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(`${publicPath}/index.html`);
});

app.listen(port, () => console.log(`Server is up on port ${port}.`));
