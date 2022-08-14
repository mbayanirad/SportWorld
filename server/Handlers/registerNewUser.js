const { creatClient } = require("../utils/creatClient");
const { getPositionFromAddress } = require("../utils/getPositionFromAddress");
const { hashPassword } = require("../utils/passwordAuth");
const { uploadImgByCloudinary } = require("../utils/uploadImgByCloudinary");
const client = creatClient();
const dbName = "finall_project";

const registerNewUser = async (req, res) => {
  let userInfo = req.body;

  //upload user image on cloudinary
  let img = await uploadImgByCloudinary(userInfo.imgSrc);
  userInfo.imgSrc = img.public_id;

  //upload user Banner on cloudinary
  img = await uploadImgByCloudinary(userInfo.bannerSrc);
  userInfo.bannerSrc = img.public_id;
  
  //hash password
  const hashPass = await hashPassword(userInfo.password);
  
  // get lat and lng from user address and create
  // position:{address:"",geo:{lat: ,lng: }}
  const geo = await getPositionFromAddress(userInfo.address).then((res) => {
    return res;
  });

  userInfo = {
    ...userInfo,
    password:hashPass,
    position: {
      geo: geo,
      address: userInfo.address,
    },
  };

  await delete userInfo.address;
  await delete userInfo.verifyPassword;
  // console.log(geo);
  try {
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db(dbName);
    const result = await db.collection("users").insertOne(userInfo);
      
     return result
       ? res.status(200).json({ status: 200, data: {_id:result.insertedId,...userInfo }})
       : res.status(404).json({ status: 404, massege: "Faild" });
  } catch (err) {
    res.status(500).json({ status: 500, Message: err.Message });

    // close the connection to the database server
  } finally {
    client.close();
  }
};

module.exports = { registerNewUser };
