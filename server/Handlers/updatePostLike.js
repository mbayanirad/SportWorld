const { ObjectId } = require("mongodb");
const { creatClient } = require("../utils/creatClient");
const { uploadImgByCloudinary } = require("../utils/uploadImgByCloudinary");
const client = creatClient();
const dbName = "finall_project";

const updatePostLike = async (req, res) => {
  const { postId, userId, method } = req.body;
  const query = {
    _id: ObjectId(postId),
  };
  try {
    await client.connect();
    // connect to the database
    const db = client.db(dbName);
    let result = null;
    if (method == "pull") {
      result = await db.collection("sportStatus").updateOne(query, {
        $pull: { likeBy: userId }})
    }else{
      result = await db.collection("sportStatus")
      .updateOne(query,{$push:{likeBy: userId}})
    }
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

module.exports = { updatePostLike };
