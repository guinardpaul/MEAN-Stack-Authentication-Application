const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = (router) => {

  /**
   * Register User
   */
  router.post('/register', (req, res, next) => {
    if (!req.body.username) {
      res.json({
        success: false,
        message: 'Username not provided'
      });
    } else if (!req.body.password) {
      res.json({
        success: false,
        message: 'Password not provided'
      });
    } else if (!req.body.email) {
      res.json({
        success: false,
        message: 'Email not provided'
      });
    } else {
      let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email.toLowerCase()
      });

      user.save((err, data) => {
        if (err) {
          if (err.code === 11000) {
            res.json({
              success: false,
              message: 'Username or email already exists'
            });
          } else if (err.errors) {
            if (err.errors.email) {
              res.json({
                success: false,
                message: err.errors.email.message
              });
            } else if (err.errors.username) {
              res.json({
                success: false,
                message: err.errors.username.message
              });
            }
          }
          res.json({
            success: false,
            message: err
          });
        } else {
          res.json({
            success: true,
            obj: data,
            message: data.username + ' registered'
          });
        }
      });
    }
  });

  /**
   * Login User
   */
  router.get('login', (res, send, next) => {

  });

  return router;
}