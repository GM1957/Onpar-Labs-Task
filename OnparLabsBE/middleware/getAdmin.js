const Admin = require("../models/Admin");

async function getAdmin(req, res, next) {
  const adminID = req.body.adminID ? req.body.adminID : req.params.adminID;
  await Admin.find({ adminID: adminID })
    .then((admin) => {
      if (admin === null) {
        return res.status(404).json({ message: "cannot find admin" });
      }
      res.Admin = admin;
      next();
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "internal server error", error: err.message })
    );
}

module.exports = { getAdmin };
