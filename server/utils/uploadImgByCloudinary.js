const { cloudinary } = require("../utils/cloudinary");

const uploadImgByCloudinary = async (fileStr) => {
  console.log(fileStr)
  try {
    return await cloudinary.uploader.upload(fileStr, {
      //specify the folder that i made on cloudinary
      upload_preset: "dev_setups",
    });
  } catch (err) {
    return err;
  }
};
module.exports = { uploadImgByCloudinary };
