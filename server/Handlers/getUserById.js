const {creatClient} = require("./utils")
const client = creatClient();
const dbName = "finall_project";

const getUserByInfo = async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId, password);
  try {
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db(dbName);
    const result = await db
      .collection("users")
      .find({ userId: userId, password: password })
      .toArray();

    //---------------------------------check for output -------------------------------------
    if (result.length > 0) res.status(200).json({ status: 200, data: result });
    else res.status(404).json({ status: 404, Message: `there isn't any item` });
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
};

module.exports = { getUserByInfo};
