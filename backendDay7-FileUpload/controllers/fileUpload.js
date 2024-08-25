const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFileUpload -> handlerfunction

exports.localFileUpload = async (req, res) =>{
    try{
        // fetch file
        const file = req.files.file;
        console.log("file mil gya: ", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path ", path);

        file.mv(path, (err) =>{
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully",
        })

    }
    catch(err) {
         console.log(err);
    }
}


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type); // Fix the typo here
}


async function uploadFileCloudinary(file, folder){
    const options = {folder};
    console.log("temp file path->: ", file.tempFilePath);
    options.resource_type = "auto";
    await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image Upload ka handler

exports.imageUpload = async (req, res) =>{
    try{
        // data fetch
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
       
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File fromate is not supported",
            })
        }

        // file formate supported hai
        
        const resopnse = await uploadFileCloudinary(file, "sahul");
        console.log(resopnse);
        // db me entry save krne hai
        // const fileData = await File.create({
        //     name,
        //     tags,
        //     email,
        //     imageUrl
        // })

        res.json({
            success: true,
            message: "Image Successfully Uploaded"
        })
      

    }catch(error){
        // console.log(cloud_name);
        console.log(error);

        res.status(400).json({
            success: false,
            message: "Image not Uploded something error",
        });
    }
}