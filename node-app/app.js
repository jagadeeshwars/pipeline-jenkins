const express = require('express');
const app = express();

const ports = [3001, 3002];

app.get('/', (req, res) => {
  res.send('Hello from Node.js app!');
});

ports.forEach(port => {
  app.listen(port, () => {
    console.log("App listening at http://localhost:" + port);
  });
});
