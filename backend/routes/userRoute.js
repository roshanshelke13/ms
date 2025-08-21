const express = require("express");
const router = express.Router();

const {login,loginGoogle,signup} = require("../controller/auth")

router.post("/login",login);
router.post("/loginGoogle",loginGoogle);
router.post("/signup",signup);

module.exports = router;