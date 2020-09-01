var express = require('express');
var router = express.Router();

var user_md = require('../models/user');
var post_md = require('../models/post');

// === ADMIN HOME ===
router.get('/', (req, res) => {

  res.render('admin/dashboard');
});

// === SIGNIN ===
router.get('/signin', (req, res) => {
  res.render('signin', { data: {} });
});

// === SIGNUP ===
router.get('/signup', (req, res) => {
  res.render('signup', { data: {} });
});

router.post('/signup', async (req, res) => {
  req.user = new user_md();
  let user = req.user;
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.passwd;

  if (req.body.email.trim().length === 0) {
    res.render('signup', { data: { error: 'Email is required' } });
  }

  if (req.body.passwd !== req.body.repasswd && req.body.passwd.trim().length !== 0) {
    res.render('signup', { data: { error: 'Password is not match' } });
  }

  try {
    await user.save();
    await user.generateAuthToken();
    res.redirect('/admin/signin');
  } catch (e) {
    res.render('signup', { data: { error: 'error' } });
  }
});

module.exports = router;
