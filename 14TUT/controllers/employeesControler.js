const fsPromises = require('fs').promises;
const path = require('path');

// fetch("http://localhost:3500/employees", {
//     method: 'PUT',
//   headers: {
// "Content-Type": "application/json",
// },
//     body: JSON.stringify({id: 1, firstname: "Jack", lastname: "Nicholson"})
// }).then(res => {
//     console.log(res.json())
// })

// work
const getAllEmployees = (req, res) => {
  const dbEmployees = require('../model/employees.json');
  console.log('cookies', res.cookies);
  res.json(dbEmployees);
};

// works
const createEmployee = async (req, res) => {
  const dbEmployees = require('../model/employees.json');
  const { firstname, lastname } = req.body;
  console.log('create employee cookies', res.cookies);

  const employeeExists = dbEmployees.some((user) => user.lastname === lastname);

  if (employeeExists) {
    return res
      .status(400)
      .json({ message: `Employee with lastname ${lastname} already exists` });
  }

  const updatedEmployees = [
    ...dbEmployees,
    { firstname, lastname, id: dbEmployees.length + 1 },
  ];

  await updateEmployees(updatedEmployees);
  res.json(updatedEmployees);
};

// works
const updateEmployee = async (req, res) => {
  const dbEmployees = require('../model/employees.json');
  console.log(req.body);
  const employee = dbEmployees.find((e) => parseInt(req.body.id));

  if (!employee) {
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found`,
    });
  }

  const updatedEmployees = dbEmployees.reduce((acc, cur) => {
    return [
      ...acc,
      cur.id === req.body.id
        ? { ...cur, firstname: req.body.firstname, lastname: req.body.lastname }
        : cur,
    ];
  }, []);

  if (JSON.stringify(updatedEmployees) === JSON.stringify(dbEmployees)) {
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found`,
    });
  }

  await updateEmployees(updatedEmployees);
  res.json(updatedEmployees);
};

const updateEmployees = (updatedEmployees) =>
  fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'employees.json'),
    JSON.stringify(updatedEmployees, null, 2)
  );

const deleteEmployee = (req, res) => {
  const { id } = req.body;
  const dbEmployees = require('../model/employees.json');

  const isExist = dbEmployees.some((employee) => employee.id === id);
  if (!isExist) {
    return res.status(400).json({
      message: `Employee ID ${id} not found`,
    });
  }

  const updatedEmployees = dbEmployees.filter((employee) => employee.id !== id);
  updateEmployees(updatedEmployees);
  res.status(200).json({ message: `UserId ${id} was successfully deleted` });
};

const getEmployee = (req, res) => {
  res.json({
    id: req.params.id,
  });
};

module.exports = {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
  getEmployee,
};
