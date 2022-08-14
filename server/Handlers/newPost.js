const { ObjectId } = require("mongodb");
const { creatClient } = require("../utils/creatClient");
const { uploadImgByCloudinary } = require("../utils/uploadImgByCloudinary");
const client = creatClient();
const dbName = "finall_project";

const newPost = async (req, res) => {
  const data = req.body;

  // console.log("medeia is",data.media[0].url);
  try {
    //upload image on cloudinary
    // const img = await uploadImgByCloudinary(data.media[0].url);
    //set image's url whit cloudinary public_id
    data.media[0].url = "img.public_id";
    data.userId = ObjectId(data.userId);
    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db(dbName);
    let result = await db.collection("sportStatus").insertOne(data);
    console.log(result.insertedId);
    // const query = [
    //   { $addFields: { newId: { $toString: "$_id" } } },
    //   { $addFields: { newUserId: { $toString: "$userId" } } },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "userId",
    //       foreignField: "_id",
    //       as: "userInfo",
    //     },
    //   },
    //   {
    //     $match: {
    //       newId: JSON.stringify(result.insertedId).replaceAll('"', ""),
    //     },
    //   },
    //   { $unwind: "$userInfo" },
    //   {
    //     $project: {
    //       _id: "$newId",
    //       userId: "$newUserId",
    //       likeBy: 1,
    //       media: 1,
    //       reSport: 1,
    //       status: 1,
    //       timeStamp: 1,
    //       userInfo: "$userInfo",
    //     },
    //   },
    // ];
    // console.log("query is", query);
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
      console.log("------------------------");
      console.log(result);
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