const express = require('express');
const router = express.Router();

const loggedUser = (req, res, next) => {
  if (req.user == undefined) {
    res.redirect('/user/no-permission');
  } else {
    next();
  };
};

router.get('/logged', loggedUser, (req, res) => {
  res.render('logged', {
    name: req.user.name.givenName,
    lastName: req.user.name.familyName,
    avatar: req.user.photos[0].value
  });
});

router.get('/logged', (req, res) => {
  req.user ? res.render('logged') : res.redirect('no-permission');
  console.log('req.user logged', req.user);
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', loggedUser, (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', loggedUser, (req, res) => {
  res.render('settings');
});

module.exports = router;