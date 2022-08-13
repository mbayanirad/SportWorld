const {creatClient} = require("../utils/creatClient");
const { checkPassword } = require("../utils/passwordAuth");
const client = creatClient();
const dbName = "finall_project";

const getUserByInfo = async (req, res) => {
  const { userId, password } = req.body.data;
  console.log(userId, password );
  try {
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db(dbName);
    // grabbing from the collection
    const result = await db
      .collection("users")
      .find({ $or: [ { userId:userId }, { email: userId } ] })
      .toArray();
    // console.log(result);
    //---------------------------------check for output -------------------------------------
    if (result.length > 0){
      if (checkPassword(password,result[0].password)) 
        res.status(200).json({ status: 200, data: result[0] });
      else res.status(401).json({ status: 401, Massege: "Unauthorized" });
    }
    else res.status(404).json({ status: 404, Message: `there isn't any item` });

  } catch (err) {
    res.status(500).json({ status: 500, Message: err.Message });

    // close the connection to the database server
  } finally {
    client.close();
  }
};

module.exports = { getUserByInfo};
