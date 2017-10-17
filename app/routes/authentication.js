const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

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
        username: req.body.username.toLowerCase(),
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
            } else if (err.errors.password) {
              res.json({
                success: false,
                message: err.errors.password.message
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
  router.post('/login', (req, res, next) => {
    if (!req.body.username) {
      res.json({
        success: false,
        message: 'username not provided'
      });
    } else if (!req.body.password) {
      res.json({
        success: false,
        message: 'password not provided'
      });
    } else {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          res.json({
            success: false,
            message: err
          });
        } else {
          if (!user) {
            res.json({
              success: false,
              message: 'username ' + req.body.username + ' doesn\'t exists'
            });
          } else {
            const validatePassword = user.comparePassword(req.body.password);
            if (!validatePassword) {
              res.json({
                success: false,
                message: 'Wrong password'
              });
            } else {
              const token = jwt.sign({
                userId: user._id
              }, config.secret, { expiresIn: '24h' })

              res.json({
                success: true,
                message: 'logged in',
                obj: { username: user.username },
                token: token
              });
            }
          }
        }
      });
    }
  });

  router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      res.json({
        success: false,
        message: 'token not provided'
      });
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({
            success: false,
            message: 'token invalid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  });

  router.get('/profile', (req, res, next) => {
    User.findById(req.decoded.userId).select('username email').exec((err, user) => {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else if (!user) {
        res.json({
          success: false,
          message: 'User not find'
        });
      } else {
        res.json({
          success: true,
          obj: user
        });
      }
    })
  });

  return router;
}