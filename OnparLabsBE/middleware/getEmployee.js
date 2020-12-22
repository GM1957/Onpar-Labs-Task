const Employee = require('../models/Employees')

async function getEmployee(req, res, next){
    const employeeId = req.body.employeeId ? req.body.employeeId : req.params.employeeId;
    await Employee.find({ employeeID: employeeId })
    .then((employee) => {
      console.log(employee);
      if (employee === null) {
        return res.status(404).json({ message: "cannot find employee" });
      }
      res.Employee = employee;
      next();
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "internal server error", error: err.message })
    );
}

module.exports = { getEmployee }