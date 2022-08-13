const { creatClient } = require("../utils/creatClient");
const client = creatClient();
const dbName = "finall_project";

const getAllusers = async (req, res) => {
  const _id = req.body._id;
  try {
    // connect to the client
    await client.connect();
    // connect to the database
    const db = client.db(dbName);
    const result = await db.collection("users").find().toArray();
    return result.length > 0 
      ? res.status(200).json({status:200, data: result})
      : res.status(404).json({status:404, Massage: "not found"})
      
  } catch (err) {
    res.status(500).json({ status: 500, Message: err.Message });

    // close the connection to the database server
  } finally {
    client.close();
  }
};

module.exports = { getAllusers };
