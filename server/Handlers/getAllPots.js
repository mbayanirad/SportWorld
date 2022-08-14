const { ObjectId } = require("mongodb");
const { creatClient } = require("../utils/creatClient");
const { uploadImgByCloudinary } = require("../utils/uploadImgByCloudinary");
const client = creatClient();
const dbName = "finall_project";

const getAllPosts = async (req, res) => {
  console.log("test i am inside")
  try {
    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db(dbName);
    const joindToUsers = await db
      .collection("sportStatus")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {$unwind:"$userInfo"}
      ])
      .toArray();
    return joindToUsers
      ? res.status(200).json({
          status: 200,
          data: joindToUsers,
        })
      : res.status(404).json({ status: 404, massege: "Faild" });
  } catch (err) {
    res.status(500).json({ status: 500, Message: err.Message });

    // close the connection to the database server
  } finally {
    client.close();
  }
};

module.exports = { getAllPosts };
