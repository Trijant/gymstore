const Item = require('../models/item')
const { fileUploadCloudinary } = require('../utils/cloudinaryUpload')

exports.getItemController = async (req, res) => {
    try {
        const { id, tag } = req.body
        let options = {}
        if (id) {
            options["_id"] = id
        }
        if (tag) {
            options.tag = tag
        }

        const dbResponse = await Item.find(options)

        if (!dbResponse) {
            return res.status(500).json({
                success: false,
                message: "unable to fetch items."
            })
        }

        return res.status(200).json({
            success: true,
            data: dbResponse,
            message: "got the items."
        })
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: "we got error while getting items."
        })
    }

}



exports.addItemController = async (req, res) => {
    try {
        const { title, description, tag } = req.body
        console.log(req.files.file)
        const {file} = req.files;

        if (!title || !description || !tag || !file) {
            return res.status(400).json({
                success: false,
                message: "please provide all the details."
            })
        }

        const img = (await fileUploadCloudinary(file)).secure_url

        const dbResponse = await Item.create({ title, description, tag, img })

        if (!dbResponse) {
            return res.status(500).json({
                success: false,
                message: "unable to fetch items."
            })
        }

        return res.status(200).json({
            success: true,
            data: dbResponse,
            message: "got the items."
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "we got error while getting items."
        })
    }

}


exports.addToCartController=async (req,res)=>{
try{
    const {userId,itemId}=req.body
    if (!id) {
        return res.status(400).json({
            success:false,
            message:"please provide all the details."
        })
    }

    const dbResponse=await User.findByIdAndUpdate(userId,{$push:{cart:itemId}})

    if (!dbResponse) {
        return res.status(500).json({
            success:false,
            message:"unable to add to cart."
        })
    }
    return res.status(200).json({
        success:true,
        data:dbResponse,
        message:"successfully added to cart."
    })
}
catch (error) {
    console.error(error.message)
    return res.status(500).json({
        success: false,
        message: "we got error while adding to cart."
    })
}

}
exports.removeFromCartController=async (req,res)=>{
try{
    const {userId,itemId}=req.body
    if (!id) {
        return res.status(400).json({
            success:false,
            message:"please provide all the details."
        })
    }

    const dbResponse=await User.findByIdAndUpdate(userId,{$pop:{cart:itemId}})

    if (!dbResponse) {
        return res.status(500).json({
            success:false,
            message:"unable to add to cart."
        })
    }
    return res.status(200).json({
        success:true,
        data:dbResponse,
        message:"successfully added to cart."
    })
}
catch (error) {
    console.error(error.message)
    return res.status(500).json({
        success: false,
        message: "we got error while adding to cart."
    })
}

}