const { ObjectId } = require("mongodb");
const {creatClient} = require("../utils/creatClient")
const client = creatClient();
const dbName = "finall_project";


const updateEventParticipant = async (req, res) => {
    // const {groupId, eventId, userId,method} = req.body;
    console.log("body is",req.body)
    // const  query = {
    //   _id: ObjectId(groupId),
    //   "annuncements.id":eventId
    // }
    // let result = null;
    // try {
    //     // connect to the client
    //     await client.connect();
    
    //     // connect to the database 
    //     const db = client.db(dbName);
    //     if(method === "pull")
    //     {

    //       result = await db.
    //       collection("groups").
    //       updateOne(
    //         query,{
    //           $pull:{"annuncements.$.participants":userId}
    //         })
    //       }else{
    //         result = await db.
    //         collection("groups").
    //         updateOne(
    //           query,{
    //             $push:{"annuncements.$.participants":userId}
    //           })
    //       }
    //       if(result.modifiedCount > 0)
    //         return res.status(200).json({status:200,data:result});
    //       return res.status(404).json({status:404, Massege:"not found"})

    // } catch (err) {
    //     res.status(500).json({ status: 500, Message: err.Message });
    
    //     // close the connection to the database server
    //   } finally {
    //     client.close();
    //   }
}

module.exports = {updateEventParticipant}