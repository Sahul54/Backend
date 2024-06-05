const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract JWT Token
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            // Assign the decoded payload to req.user
            req.user = payload;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Error while verifying the token',
        });
    }
};

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: 'Access denied. This is a protected route for students only.',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while checking user role",
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: 'Access denied. This is a protected route for admins only.',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while checking user role",
        });
    }
};
