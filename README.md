# Crypto Password
Utilises ```node.js```'s  ```crypto``` module to encrypt passwords with a salt.

Very simple to use and helps creates salts and password hashes to be entered into the database, for security. Because you know, storing passwords in raw form, or even without a salt is very bad practice.

Usage:

```js
var passwordEncrypter = require('password-encrypter');

passwordEncrypter.encrypt("password123!", function (salt, hashedPassword) {
  // do whatever you want with the salt and hashedPassword;
});
```

A Salt and Password hash will be created. Import this into MongoDB to create various users.
