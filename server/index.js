const express = require('express');
const morgan = require('morgan');
const { getAllGroups } = require('./Handlers/getAllGroups');
const { uploadImgByCloudinary } = require('./Handlers/uploadImgByCloudinary');
const { getUserByInfo } = require('./Handlers/getUserByInfo');
const { updateEventParticipant } = require('./Handlers/updateEventParticipant');
const { registerNewUser } = require('./Handlers/registerNewUser');
const { getAllusers } = require('./Handlers/getAllusers');
const { newPost } = require('./Handlers/newPost');
const { getAllPosts } = require('./Handlers/getAllPots');
const { updatePostLike } = require('./Handlers/updatePostLike');
const { updateFollow } = require('./Handlers/updateFollow');
const { updateFriends } = require('./Handlers/updateFriends');
const { addNewGroup } = require('./Handlers/addNewGroup');
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
//get all users info
app.get('/api/users/info', getAllusers)
//get all users posts
app.get("/api/posts/all",getAllPosts);

//patch methods
//add/remove a user from an event participants
app.patch("/api/group/patricipant",updateEventParticipant)
//like or dislike post
app.patch("/api/post/updatLike", updatePostLike)
//follow or unfollow a user 
app.patch("/api/user/updatefollow",updateFollow)
//update friend request 
app.patch("/api/users/updateFriends",updateFriends)
//Posts Method
//Login endPoint
app.post('/api/user/logIn', getUserByInfo)
//register an user
app.post('/api/user/register',registerNewUser)

//insert new user post 
app.post("/api/post/new",newPost);

//insert new group
app.post("/api/groups/addNewGroup", addNewGroup)

//upload images on cloudinary 
// app.post('/api/uploadimg', uploadImgByCloudinary)

app.get("*", (req, res) => {
  res.status(404).json({
  status: 404,
  message: "This is obviously not what you are looking for.",
  });
})

app.listen(PORT, () => {
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

