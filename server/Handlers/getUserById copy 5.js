const client = creatClient();
const dbName = "finall_project";


const getUserById = async (req, res) => {
    const _id = req.body._id;
    try {
        // connect to the client
        await client.connect();
    
        // connect to the database 
        const db = client.db(dbName);
    
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
}

module.exports = {}