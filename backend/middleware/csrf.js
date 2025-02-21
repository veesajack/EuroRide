const csrf = require('csurf');
const { CSRF_SECRET } = process.env;

const csrfProtection = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true
  }
});

const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).json({ message: 'Invalid CSRF token' });
};

module.exports = {
  csrfProtection,
  csrfErrorHandler
};
