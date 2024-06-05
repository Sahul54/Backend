const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup route handler
exports.signup = async (req, res) => {
    try {
        //    get data
        const { name, email, password, role } = req.body;
        // if check user are already exits
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // password Scure
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing Password',
            });
        }

        // create entry for user
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be required, Please try again later',
        });
    }
};

// login
exports.login = async (req, res) => {
    try {
        //   data fetch
        const { email, password } = req.body;

        // validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill your details',
            });
        }

        // check for registered user
        let user = await User.findOne({ email });
        // if not registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not registered',
            });
        }

        const payload = {
            email: user.email,
            role: user.role,
        };
        // verify the password and generate jwt token
        if (await bcrypt.compare(password, user.password)) {
            // password match
            const token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            let options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged in Successfully',
            });
        } else {
            // password not match
            return res.status(403).json({
                success: false,
                message: "Please Incorrect password",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login failure',
        });
    }
};
