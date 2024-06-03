const { mongoose } = require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser:true,
        // useUnifiedTopology: true,
    })
    .then(() =>{
        console.log("DB connected Successfuly!");
    })
    .catch((err) =>{
        console.log("DB connecton issue");
        console.error(err);
        process.exit(1);
    })
}