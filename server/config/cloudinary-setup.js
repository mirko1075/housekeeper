const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

require("dotenv").config();

cloudinary.config({
  cloud_name: "dzzmsb8wl",
  api_key: "983383782832978",
  api_secret: "xbbN4yCmsThJzQltbt90TXVj90c",
});

let storage = new CloudinaryStorage({
  //A Cloudinary API object
  cloudinary,
  folder: "housekeeper", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png", "jpeg", "gif"],
  // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
  //you can preset some properties for the image
  transformation: [{ width: 120, height: 90, crop: "fill" }],
  //public_id of the file on cloudinary
  filename: function (req, res, cb) {
    let fileName = res.originalname.split(".");
    cb(null, fileName[0]); // The file on cloudinary would have the same name as the original file name
  },
});

const uploader = multer({ storage });
module.exports = uploader;
