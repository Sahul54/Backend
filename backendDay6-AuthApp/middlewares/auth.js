const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract JWT Token

        console.log("body ---> ", req.body.token);
        console.log("cookies ---> ", req.cookies.token);
        console.log(("header  --->", req.header("Authorization")));
        const token = req.body.token || req.cookies.token  || req.header("Authorization").replace("Bearer ", "");

        if (!token || token === undefined) {
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
