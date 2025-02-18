const cloudinary=require("cloudinary").v2


exports.fileUploadCloudinary=async (file,folder='/gymStore',quality=100)=>{
    const options={folder}
    options.resource_type="auto"
    options.quality=quality
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}
