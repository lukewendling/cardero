const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'somethingsecret';

function auth(req, res, next) {
  jwt.verify(req.headers.token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Failed to authenticate' });
    } else {
      req.user = decoded.user;
      next();
    }
  });
}

module.exports = auth;
