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

router.post('/signin', async (req, res) => {
  const params = req.body;

  if (params.email.trim().length === 0) {
    res.render('signin', { data: { error: 'Please enter an email' }});
  } else if (params.password.trim().length === 0) {
    res.render('signin', { data: { error: 'Please enter an password' }});
  } else {
    try {
      const user = await user_md.findByCredentials(params.email, params.password);
      if (!user) {
        res.render('signin', { data: { error: 'Password was wrong!' } });
      } else {
        const token = await user.generateAuthToken();
        console.log(user, token);
        res.redirect('/admin/');
      }
    } catch (e) {
      res.render('signin', { data: { error: 'User not exist!' } });
    }
  }
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
