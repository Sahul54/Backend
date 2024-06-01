const bcrypt = require("bcrypt");
const User = require("../models/User");

// Signup route handler
exports.signup = async (req, res) =>{
    try{
    //    get data
    const {name, email, password, role} = req.body;
    // if check user are already exits
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
           success:false,
           message: 'User already exists', 
        })
    }

    // password Scure
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 10);
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message: 'Error in hassing Password',
        })
    }
    
    // create entry for user
    const user = await User.create({
        name, email, password:hashedPassword,role
    })
     
    return res.status(200).json({
        success:true,
        message: 'User Created Successfully',
    });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: 'User cannot br requried, Please try again latter',
        })
    }
}