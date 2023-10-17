const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get("*", (req, res) => {   
    res.sendFile(path.join(__dirname, '../client/build', "index.html")); 
});

// app.get('/login', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../client/build', "index.html"));
// });
// app.get('/profile', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../client/build', "index.html"));
// });
// app.get('/social', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../client/build', "index.html"));
// });
// app.listen(port, () => {
//     console.log('Server is running on port: ' + port);
// });