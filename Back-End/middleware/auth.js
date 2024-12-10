const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified; // Store decoded user info in req.user
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' + err });
  }
};
