// index.js

// app create
const express = require("express");
const app = express();

// port find
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware add
app.use(express.json());

// file upload
const fileUpload = require("express-fileupload");
app.use(fileUpload(true));

// db connect
const db = require("./config/database");
db.connect();

// cloudinary connect
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

// api route
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// server activate
app.listen(PORT, () => {
    console.log(`App started at ${PORT}`);
});
