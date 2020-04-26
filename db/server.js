const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/graphql',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Conneted with Mongo...')
);

const app = express();

app.listen(5000, () => console.log(`Listen in port 5000`));
