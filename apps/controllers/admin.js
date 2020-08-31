var express = require('express');
var router = express.Router();

var user_md = require('../models/user');
var post_md = require('../models/post');

router.get('/', (req, res) => {
  //res.json({ message: 'This is Admin page' });

  res.render('admin/dashboard');
});

module.exports = router;
