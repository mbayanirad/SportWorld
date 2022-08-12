const express = require('express');
const morgan = require('morgan');
const { getAllGroups } = require('./Handlers/getAllGroups');
const { uploadImgByCloudinary } = require('./Handlers/uploadImgByCloudinary');
const { getUserByInfo } = require('./Handlers/getUserByInfo');
const { updateEventParticipant } = require('./Handlers/updateEventParticipant');
const PORT = process.env.PORT || 4000;



//load config
require("dotenv").config({path:"./config/config.env"})


const app = express()

//logging 
if (process.env.NODE_ENV === "development") {
    app.use(morgan('env'));
    app.use(function(req, res, next) {
      res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    })
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb',extended:true}))
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//get Methods
//get all groups info
app.get('/api/AllGroups', getAllGroups)

//patch methods
//add/remove a user from an event participants
app.patch("/api/group/patricipant",updateEventParticipant)

//Posts Method
//Login end point
app.post('/api/user', getUserByInfo)
//upload images on cloudinary 
app.post('/api/uploadimg', uploadImgByCloudinary)

app.get("*", (req, res) => {
  res.status(404).json({
  status: 404,
  message: "This is obviously not what you are looking for.",
  });
})

app.listen(PORT, () => {
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

