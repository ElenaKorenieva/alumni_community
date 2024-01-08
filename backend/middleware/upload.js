const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

require("dotenv").config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: async (req, file) => {
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: file.originalname,
      transformation: [{ width: 68, height: 68, crop: "scale" }],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
