const express = require('express');
const morgan = require('morgan');
const { getUserByInfo } = require('./Handlers/getUserById');
const PORT = process.env.PORT || 4000;



//load config
require("dotenv").config({path:"./config/config.env"})


const app = express()

//logging 
if (process.env.NODE_ENV === "development") {
    app.use(morgan('env'))
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
    // .use(morgan('tiny'))
    app.use(express.static('./server/assets'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use('/', express.static(__dirname + '/'))
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/user', getUserByInfo)

app.get("*", (req, res) => {
  res.status(404).json({
  status: 404,
  message: "This is obviously not what you are looking for.",
  });
})

app.listen(PORT, () => {
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

