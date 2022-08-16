const { ObjectId } = require("mongodb");
const { creatClient } = require("../utils/creatClient");
const { uploadImgByCloudinary } = require("../utils/uploadImgByCloudinary");
const client = creatClient();
const dbName = "finall_project";

const newPost = async (req, res) => {
  const data = req.body;
  try {
    //upload image on cloudinary
    const img = await uploadImgByCloudinary(data.media[0].url);
    //set image's url whit cloudinary public_id
    //for add mor imgs/videos i need use a for loop(streach goal)
    data.media[0].url = img.public_id;
    //convert userIId to ObjectId
    data.userId = ObjectId(data.userId);
    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db(dbName);
    //join post collection to users collection by userId
    let result = await db.collection("sportStatus").insertOne(data);
    console.log(result.insertedId);
    const joindToUsers = await db
      .collection("sportStatus")
      .aggregate([
        // { $addFields: { newId: { $toString: "$_id" } } },
        // { $addFields: { newUserId: { $toString: "$userId" } } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" }
      ])
      .toArray();
      result = await joindToUsers.find(aggregate => JSON.stringify(aggregate._id) === JSON.stringify( result.insertedId));
    return result
      ? res.status(200).json({
          status: 200,
          data: result,
        })
      : res.status(404).json({ status: 404, massege: "Faild" });
  } catch (err) {
    res.status(500).json({ status: 500, Message: err.Message });

    // close the connection to the database server
  } finally {
    client.close();
  }
};

module.exports = { newPost };
