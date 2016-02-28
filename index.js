/*jslint es5: true, node: true */
'use strict';

var crypto = require('crypto');

function makeSalt(byteSize, callback) {
  var defaultByteSize = 16;

  if (typeof arguments[0] === 'function') {
    callback = arguments[0];
    byteSize = defaultByteSize;
  } else if (typeof arguments[1] === 'function') {
    callback = arguments[1];
  }

  if (!byteSize) {
    byteSize = defaultByteSize;
  }

  if (!callback) {
    return crypto.randomBytes(byteSize).toString('base64');
  }

  return crypto.randomBytes(byteSize, function(err, salt) {
    if (err) {
      callback(err);
    }
    return callback(null, salt.toString('base64'));
  });
}

function encryptPassword(password, preSalt, callback) {
  var defaultIterations = 10000,
    defaultKeyLength = 64,
    salt = new Buffer(preSalt, 'base64');

  if (!callback) {
    return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength).toString('base64');
  }

  return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function(err, key) {
    if (err) {
      callback(err);
    }
    return callback(null, key.toString('base64'));
  });
}

exports.encrypt = function(rawPassword, callback) {
  makeSalt(function(saltErr, salt) {
    encryptPassword(rawPassword, salt, function(encryptErr, hashedPassword) {
      callback(salt, hashedPassword);
    });
  });
};

exports.checkMatch = function(password, salt, callback) {
  var defaultIterations = 10000,
    defaultKeyLength = 64,
    saltBuffer = new Buffer(salt, 'base64');

  return crypto.pbkdf2(password, saltBuffer, defaultIterations, defaultKeyLength, function(err, key) {
    if (err) {
      return callback(err);
    }
    
    if (password === key.toString('base64')) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
};
