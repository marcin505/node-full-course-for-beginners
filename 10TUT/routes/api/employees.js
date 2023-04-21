const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesControler');
const ROLES_LIST = require('../../config/roles_list');
// const verifyJWT = require('../../middleware/verifyJWT');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor]),
    employeesController.createEmployee
  )
  .put(
    verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor]),
    employeesController.updateEmployee
  )
  .delete(verifyRoles([ROLES_LIST.Admin]), employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);
module.exports = router;
