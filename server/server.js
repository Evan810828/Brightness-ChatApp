const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get("/", (req, res) => {
    let url = path.join(__dirname, '../client/build', 'index.html');
    if (!url.startsWith('/app/')) // since we're on local windows
      url = url.substring(1);
    res.sendFile(url);
  });

  app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build', "index.html"));
});
app.get('/profile', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build', "index.html"));
});
app.get('/social', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build', "index.html"));
});
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});