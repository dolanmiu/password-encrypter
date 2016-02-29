# Crypto Password
Utilises node.js's  crypto module to encrypt passwords with a salt.

> Very simple to use and helps creates salts and password hashes to be entered into the database, for security. Because you know, storing passwords in raw form, or even without a salt is very bad practice.

## Usage:

```js
var passwordEncrypter = require('password-encrypter');

passwordEncrypter.encrypt("password123!", function (salt, hashedPassword) {
  // do whatever you want with the salt and hashedPassword;
});
```

There is no real way to decrypt the password, so the only way is to encrypt and check. To check if encrypted password is correct:

```js
passwordEncrypter.checkMatch("password123!", "HASHED_PASSWORD", "MY_SALT", function (err, isMatch) {
  if (isMatch) {
    // success! the passwords are correct! Assign sessions/cookies to user and authenticate
  } else {
    // Boo! Wrong password.
  }
});
```
## License

MIT: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
