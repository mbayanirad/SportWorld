const {creatClient} = require('../utils/creatClient')
const {cloudinary} = require("../utils/cloudinary")
const client = creatClient();
const dbName = "finall_project";


const uploadImgByCloudinary = async (req, res) => {
    const fileStr = req.body.data;
    try {
        const uploadResponse = await cloudinary.uploader
          .upload(fileStr,{
            upload_preset: 'dev_setups'
          })
          console.log(uploadResponse);
          res.json({msg:"YAYAYYA"});
        // connect to the client
        await client.connect();
    
        // connect to the database 
        const db = client.db(dbName);
    
        // grabbing from the collection
        // const items = await db.collection("items").find(query).toArray();
    
        //destructure all categories
        // const categorys = [...new Set(items.map((item) => item.category))];

    } catch (err) {
        res.status(500).json({ status: 500, Message: err.Message });
    
        // close the connection to the database server
      } finally {
        client.close();
      }
}

module.exports = {uploadImgByCloudinary}