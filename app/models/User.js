const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Validator functions
let validUsernameChecker = (username) => {
  if (!username) {
    return false;
  } else {
    const regExp = new RegExp(/[a-zA-z-_éè]+$/);
    return regExp.test(username);
  }
};

let lengthUsernameChecker = (username) => {
  if (!username) {
    return false;
  } else if (username.length < 3 || username.length > 20) {
    return false;
  }
  return true;
};

let lengthEmailChecker = (email) => {
  if (!email) {
    return false;
  } else if (email.length < 5 || email.length > 40) {
    return false;
  }
  return true;
};

let validEmailChecker = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};

let lengthPasswordChecker = (password) => {
  if (!password) {
    return false;
  } else if (password.length < 3 || password.length > 40) {
    return false;
  }
  return true;
};

// Validators
const usernameValidator = [
  {
    validator: validUsernameChecker,
    message: 'Username not valid'
  }, {
    validator: lengthUsernameChecker,
    message: 'Username must have less than 20 characters and more than 3'
  }
];

const emailValidator = [
  {
    validator: validEmailChecker,
    message: 'Email not valid'
  }, {
    validator: lengthEmailChecker,
    message: 'Email must have less than 40 characters and more than 5'
  }
];

const passwordValidator = [
  {
    validator: lengthPasswordChecker,
    message: 'Password must have less than 40 characters and more than 3'
  }
]

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: usernameValidator
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: emailValidator
  }
});

// Password middleware : hash password
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Compare password & hash : used for login
userSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);