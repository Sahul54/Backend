const { mongoose } = require("mongoose");
require("dotenv").config();

// console.log(process.env.MONGODB_URL);

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected Successfully!");
    })
    .catch((err) => {
        console.log("DB connection issue");
        console.error('Error details:', err);
        process.exit(1);
    });
}
