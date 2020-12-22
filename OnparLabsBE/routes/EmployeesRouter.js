const express = require("express");
const router = express.Router();
const Employee = require("../models/Employees");
const upload = require("../middleware/upload");
const { getEmployee } = require("../middleware/getEmployee");
const { getAdmin } = require("../middleware/getAdmin");

// Getting all Employees
router.get("/", async (req, res) => {
  await Employee.find()
    .then((Employees) => res.json(Employees))
    .catch((err) => res.status(500).json({ message: err.message }));
});

// Getting one Employee
router.get("/:employeeId", getEmployee, (req, res) => res.send(res.Employee));

// Creating one Employee
router.post("/", upload.array("files", 100), getAdmin, async (req, res) => {
  if (res.Admin[0].isAdmin) {
    const employee = new Employee({
      name: req.body.name,
      employeeID: req.body.employeeID,
      age: req.body.age ? req.body.age : null,
      phone: req.body.phone ? req.body.phone : null,
      email: req.body.email ? req.body.email : null,
    });

    if (req.files) {
      let path = [];
      req.files.forEach(function (files, index, arr) {
        console.log("files from foreach", files);
        let fileName = files.originalname.substring(
          0,
          files.originalname.indexOf(".")
        );
        if (fileName === req.body.employeeID) {
          path.append(files.path)
        }
      });
      console.log("this is file path", path);
      employee.files = path;
    }

    await employee
      .save()
      .then((newEmployee) => res.status(201).json(newEmployee))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else res.status(400).json({ message: "invalid admin" });
});

// Updating one Employee
router.patch(
  "/:employeeId",
  getEmployee,
  getAdmin,
  upload.array("files", 100),
  async (req, res) => {
    if (res.Admin[0].isAdmin) {
      if (req.body.length) {
        if (req.body.name) res.Employee.name = req.body.name;
        if (req.body.age) res.Employee.age = req.body.age;
        if (req.body.phone) res.Employee.phone = req.body.phone;
        if (req.body.email) res.Employee.email = req.body.email;
        if (req.files) {
          let path = [];
          req.files.forEach(function (files, index, arr) {
            console.log("files from foreach", files);
            let fileName = files.originalname.substring(
              0,
              files.originalname.indexOf(".")
            );
            if (fileName === req.body.employeeID) {
              path.append(files.path)
            }
          });
          console.log("this is file path", path);
          res.Employee.files = path;
        }
        await res.Employee.save()
          .then((updatedEmployee) => res.json(updatedEmployee))
          .catch((err) => res.status(400).json({ message: err.message }));
      } else {
        res.status(404).json("request is not valid");
      }
    } else {
      res.status(400).json({ message: "invalid admin" });
    }
  }
);

// Deleting one Employee
router.delete("/:employeeId", getEmployee, getAdmin, async (req, res) => {
  console.log("my admin", res.Admin);
  if (res.Admin[0].isAdmin) {
    console.log('inside',res.Employee)
    await res.Employee[0].remove()
      .then(() => res.json({ message: "deleted the employee sucessfuly" }))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "internal server error", error: err.message })
      );
  } else {
    res.status(400).json({ message: "invalid admin" });
  }
});

module.exports = router;
