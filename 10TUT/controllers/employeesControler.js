const fsPromises = require('fs').promises;
const path = require('path');

const data = {
  employees: require('../model/employees.json'),
  setEmployees: function (employees) {
    this.employees = employees;
  },
};

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
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
};

const updateEmployee = async (req, res) => {
  console.log(req.body);
  const employee = data.employees.find((e) => parseInt(req.body.id));
  if (!employee) {
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found`,
    });
  }

  const updatedEmployees = data.employees.reduce((acc, cur) => {
    return [
      ...acc,
      cur.id === req.body.id
        ? { ...cur, firstname: req.body.firstname, lastname: req.body.lastname }
        : cur,
    ];
  }, []);

  if (JSON.stringify(updatedEmployees) === JSON.stringify(data.employees)) {
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found`,
    });
  }

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'employees.json'),
    JSON.stringify(updatedEmployees)
  );

  data.setEmployees(updatedEmployees);
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  res.json({ id: req.body.is });
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
  createNewEmployee,
  getEmployee,
};
