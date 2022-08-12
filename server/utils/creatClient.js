
require('dotenv').config();

// function to create client
const creatClient = () =>{
    const { MongoClient } = require("mongodb");
    const {MONGO_URI} = process.env;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

    return new MongoClient(MONGO_URI, options);
}


module.exports = {creatClient}