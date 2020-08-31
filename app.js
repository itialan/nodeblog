require('./apps/common/database');
const express = require('express');

const app = express();
const port = process.env.PORT;

// Automatic find index.js
var controller = require(__dirname + '/apps/controllers');

app.use(controller);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
