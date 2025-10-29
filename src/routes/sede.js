const express = require("express");
const {getSedeByID} = require("../controllers/sedes")
const router = express.Router();

router.get("/:id", getSedeByID);

module.exports = router;