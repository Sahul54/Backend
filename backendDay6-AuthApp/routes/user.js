const express = require("express");
const router = express.Router();
const User = require("../models/User");

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

router.get("/getEmail", auth, async (req, res) =>{
    try{
        const id = req.user.id;
        console.log("Id: ", id);
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            user: user,
            message: "welcome to route email"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error: error.message,
            message: "some thing wrong",
            })
    }
});

module.exports = router;