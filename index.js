const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(5000, () => {
  console.log(`Listen port 5000`);
});
