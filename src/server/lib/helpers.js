var bcrypt = require('bcrypt-nodejs');

function isAuthenticated(req, res, next){
  if (req.user){
    return next();
  } else {
    return res.redirect('/login');
  }
}

function loginRedirect(req, res, next){
  if (req.user){
    return next();
  } else {
    return res.redirect('/');
  }
}

function hashing(password){
  return bcrypt.hashSync(password, 12);
}

function comparePassword(password, hashedPassword){
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  isAuthenticated: isAuthenticated,
  loginRedirect: loginRedirect,
  hashing: hashing,
  comparePassword: comparePassword
};