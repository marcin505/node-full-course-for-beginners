const bcrypt = require('bcrypt');

// fetch("http://localhost:3500/auth", {
//       headers: {
// "Content-Type": "application/json",
// },
// method: 'POST',
//     body: JSON.stringify({username: "Darth", password: "kurde"}),
// })

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'User name and password are required' });
  }

  const dbUsers = require('../model/users.json');
  const foundUser = dbUsers.find((user) => user.username === username);
  if (!foundUser) {
    return res.sendStatus(401); // Unathorized
  }

  //evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    //create JWT
    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // saving refresh token with current user
    const newUsers = dbUsers.map((user) => ({
      ...user,
      ...{
        ...(user.username === foundUser.username && {
          refreshToken,
          accessToken, // accessToken shouldn't be exposed in the db, it's here just for the data tracking sake
        }),
      },
    }));

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(newUsers, null, 2)
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true, // comment this out to create refreshToken in thunderclient
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
