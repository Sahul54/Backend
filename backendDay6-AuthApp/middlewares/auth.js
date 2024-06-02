const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract JWT Token from request body
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);

            req.user = decoded;
            next(); // Move to the next middleware or route handler
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while verifying the token',
        });
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Students',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Token is missing"
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admins',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Token is missing"
        });
    }
}
