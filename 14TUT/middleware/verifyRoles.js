const verifyRoles = (rolesArray) => (req, res, next) => {
  if (!req?.roles)
    return res
      .status(401)
      .json({ message: `you don't have any roles, so long sucker` });
  console.log('rolesArray', rolesArray);
  console.log(`req.roles`, req.roles);
  const result = req.roles
    .map((role) => rolesArray.includes(role))
    .find((val) => !!val);
  if (!result)
    return res.status(401).json({
      message: `${req.roles.toString()} is not enough, You need one of ${rolesArray.toString()}`,
    });
  next();
};

module.exports = verifyRoles;
