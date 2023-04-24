const User = require('../model/User');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

// fetch('http://localhost:3500/register', {
//   method: 'POST',
//     headers: {
//       "Content-Type": "application/json"  ,
//     },
//   body: JSON.stringify({ username: 'Xman', password: 'kurde' }),
// });

const handleRegister = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'User name and password are required' });
  }

  const dbUsers = require('../model/users.json');

  // check for duplcate usernames in the db
  // const duplicate = dbUsers.find((person) => person.username === username);
  const duplicate = await User.findOne({ username }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create store the new user

    const result = await User.create({ username, password: hashedPwd });
    const newUser = new User();
    console.log(result);

    const newUsers = [...dbUsers, newUser];
    // console.log(newUsers);

    // await fsPromises.writeFile(
    //   path.join(__dirname, '..', 'model', 'users.json'),
    //   JSON.stringify(newUsers, null, 2)
    // );

    res.status(201).json({ success: `New user - ${username} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRegister };
