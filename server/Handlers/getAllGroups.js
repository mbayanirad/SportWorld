const {creatClient} = require("../utils/creatClient")
const client = creatClient();
const dbName = "finall_project";


const getAllGroups = async (req, res) => {
    try {
        // connect to the client
        await client.connect();
    
        // connect to the database 
        const db = client.db(dbName);
        const result = await db
        .collection("groups")
        .find({})
        .toArray();
      //----------check for output -------------------------------------
    if (result.length > 0) res.status(200).json({ status: 200, data: result });
    else res.status(404).json({ status: 404, Message: `there isn't any item` });
   

    } catch (err) {
        res.status(500).json({ status: 500, Message: err.Message });
    
        // close the connection to the database server
      } finally {
        client.close();
      }
}

module.exports = {getAllGroups}