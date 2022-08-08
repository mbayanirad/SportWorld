const express = require('express')
const PORT = process.env.PORT || 4000;



//load config
require("dotenv").config({path:"./config/config.env"})


const app = express()

//logging 
if (process.env.NODE_ENV === "development") {
    app.use(morgan('env'))
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
})