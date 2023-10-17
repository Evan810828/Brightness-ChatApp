const express = require("express");

const port = process.env.PORT || 8080;
var app = express();

// List of all the files that should be served as-is

app.get("*", (req, res) => {

  let path = req.params['0'].substring(1)

  if (protected.includes(path)) {
    // Return the actual file
    res.sendFile(`${__dirname}/build/${path}`);
  } else {
    // Otherwise, redirect to /build/index.html
    res.sendFile(`${__dirname}/build/index.html`);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});