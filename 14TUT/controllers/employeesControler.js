const Employee = require('../model/Employee');

// work
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  console.log('kurde', employees);
  if (!employees) return res.status(204).json({ message: 'No employees do' });
  res.json(employees);
};

// works
const createEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: ' First and last namess are not required' });
  }
  const { firstname, lastname } = req.body;

  try {
    const result = await Employee.create({
      firstname,
      lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

// works
const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required' });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  const result = await employee.save();
  res.json(result);
};

// const updateEmployees = (updatedEmployees) =>
//   fsPromises.writeFile(
//     path.join(__dirname, '..', 'model', 'employees.json'),
//     JSON.stringify(updatedEmployees, null, 2)
//   );

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: 'Employee ID required' });
  const dbEmployees = require('../model/employees.json');

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }

  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
  res.status(200).json({ message: `UserId ${id} was successfully deleted` });
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Employee ID required.' });

  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
  getEmployee,
};
