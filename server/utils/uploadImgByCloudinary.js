const { cloudinary } = require("../utils/cloudinary");

const uploadImgByCloudinary = async (fileStr) => {
  try {
    if(fileStr !== ""){

      return await cloudinary.uploader.upload(fileStr, {
        //specify the folder that i made on cloudinary
        upload_preset: "dev_setups",
      });
    }else return {public_id:""}
  } catch (err) {
    return err;
  }
};
module.exports = { uploadImgByCloudinary };
