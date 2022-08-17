const { ObjectID, ObjectId } = require("bson");
const { creatClient } = require("../utils/creatClient");
const { uploadImgByCloudinary } = require("../utils/uploadImgByCloudinary");
const client = creatClient();
const dbName = "finall_project";

const addNewGroup = async (req, res) => {
  console.log("new group welcome");
  let data = req.body;
  try {
    const uploadImg = await uploadImgByCloudinary(data.banner);
    data.banner = uploadImg.public_id;
    
    // connect to the client
    await client.connect();
    let insertResult = null;
    // connect to the database
    const db = client.db(dbName);
    let result = false;
    await db
    .collection("groups")
    .insertOne(data)
    .then(async (res) => {
      if (res.acknowledged) {
        insertResult = res;
        await db.collection("users")
        .updateOne(
          { _id: ObjectId(data.owner) },
          { $push: { myGroups: JSON.stringify(res.insertedId).replace('"','').replace('"','') } }
          )
          .then((updateRes) => {
            if (updateRes.matchedCount > 0) {
                result = true;
              } 
            });
        }
      });
    //----------check for output -------------------------------------
    if (result) res.status(200).json({ status: 200, data:{_id: result.insertedId, ...data }});
    else res.status(404).json({ status: 404, Message: `there isn't any item` });
  } catch (err) {
    res.status(500).json({ status: 500, Message: err.Message });

    // close the connection to the database server
  } finally {
    client.close();
  }
};

module.exports = { addNewGroup };
