const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const { getAdmin } = require("../middleware/getAdmin");

// Getting all
router.get("/", async (req, res) => {
  await Admin.find()
    .then((Admins) => res.json(Admins))
    .catch((err) => res.status(500).json({ message: err.message }));
});

// Getting one
router.get("/:adminID", getAdmin, (req, res) => {
  res.send(res.Admin);
});

// Creating one
router.post("/", async (req,res) => {
  console.log('this is req',req)
  const admin = new Admin({
    adminID: req.body.adminID,
    name: req.body.name,
    designation: req.body.designation ? req.body.designation : null,
    email: req.body.email ? req.body.email : null,
  });
  return await admin
    .save()
    .then((newAdmin) => res.status(201).json(newAdmin))
    .catch((err) => res.status(400).json({ message: err.message }));
});

// Updating one
router.patch("/:adminID", getAdmin, async (req, res) => {
  if (req.body.length) {
    if (req.body.name) res.Employee.name = req.body.name;
    if (req.body.designation) res.Employee.designation = req.body.designation;
    if (req.body.email) res.Employee.email = req.body.email;
    await res.Admin.save()
      .then((updatedAdmin) => res.json(updatedAdmin))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else {
    res.status(404).json({ message: "invalid request" });
  }
});

// Deleting one
router.delete("/:adminID", getAdmin, async (req, res) => {
  await res.Admin[0].remove()
    .then(() => res.json({ message: "deleted the admin sucessfuly" }))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "internal server error", error: err.message })
    );
});

module.exports = router;
