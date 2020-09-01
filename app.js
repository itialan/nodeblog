require('./apps/common/database');
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/apps/views');
app.set('view engine', 'ejs');

// Automatic find index.js
var controller = require(__dirname + '/apps/controllers');

app.use(controller);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
