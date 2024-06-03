const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// testing
router.get("/test", auth, (res, req) =>{
      res.json({
        success: true,
        message: "Welconme to protected route for testing",
      });
});

// Protected Route
router.get("/student", auth, isStudent, (req, res) =>{
    res.json({
        success:true,
        message: "Welconme to protected route for Student",
    });
});

router.get("/admin", auth, isAdmin, (req, res) =>{
    res.json({
        success:true,
        message: "Welconme to protected route for Admin",
    });
});

module.exports = router;