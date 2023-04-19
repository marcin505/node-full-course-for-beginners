const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  // on client, also delete the accessToken
  const cookies = req.cookies;
  console.log('cookies', req.cookies);

  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  const dbUsers = require('../model/users.json');
  const foundUser = dbUsers.find((user) => user.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204); // No content
  }

  // Delete refreshToken

  const newUsers = dbUsers.map((user) => ({
    ...user,
    ...{
      ...(user.refreshToken === refreshToken && {
        refreshToken: '',
        accessToken: '',
      }),
    },
  }));
  console.log('loging out', newUsers);
  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(newUsers, null, 2)
  );

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
