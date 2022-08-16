const { ObjectId } = require("mongodb");
const { creatClient } = require("../utils/creatClient");
const client = creatClient();
const dbName = "finall_project";

const updateFriends = async (req, res) => {
  const { userId, loginUserId, method } = req.body;
  const query = {
    _id: ObjectId(userId),
  };
  try {
    await client.connect();
    // connect to the database
    const db = client.db(dbName);
    let result = null;
    //unFriend user that specyfied by userId
    if (method == "pull") {
    //first remove id loginUser from target user followers
      result = await db.collection("users").updateOne(query, {
        $pull: { friends: loginUserId }})
        .then(async(res) => {
          //seconde delete target user id from login user following
          if(res.modifiedCount > 0){
            return await db.collection("users").updateOne({_id: ObjectId(loginUserId)},
              {$pull:{friends: userId}})
          }
        })

    //unfollow user that specyfied by userId
    }else{
      result = await db.collection("users")
      .updateOne(query,{$push:{friends: loginUserId}})
      .then(async(res) => {
        if(res.modifiedCount > 0){
          return await db.collection("users")
          .updateOne({_id: ObjectId(loginUserId)},
          {$push:{friends: userId}});
        }
      })
    }
    return result?.modifiedCount > 0
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

module.exports = { updateFriends };
