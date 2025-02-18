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
        const file = req.files.file;

        if (!title || !description || !tag || !file) {
            return res.status(400).json({
                success: false,
                message: "please provide all the details."
            })
        }

        const img = await fileUploadCloudinary(file)

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
        console.error(error.message)
        return res.status(500).json({
            success: false,
            message: "we got error while getting items."
        })
    }

}
