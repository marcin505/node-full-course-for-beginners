const bcrypt = require('bcrypt');

// fetch("http://localhost:3500/auth", {
//       headers: {
// "Content-Type": "application/json",
// },
// method: 'POST',
//     body: JSON.stringify({username: "Darth", password: "kurde"}),
// })

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
    // create JWTs
    res.json({ succes: ` User ${username} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
