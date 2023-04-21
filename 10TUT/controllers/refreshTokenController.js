// fetch("http://localhost:3500/refresh", {method: 'GET'});
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
  const { cookies } = req;
  console.log('jwt', cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const dbUsers = require('../model/users.json');
  const foundUser = dbUsers.find((user) => user.refreshToken === refreshToken);
  if (!foundUser) {
    return res.sendStatus(403); // Forbidden
  }

  //evaluate JWT

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
