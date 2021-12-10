require("dotenv").config()
const express = require("express");
const app = express();
const cors = require('cors')
const route = require("./src/routes/index")
const port = 2015;

app.use(cors())
app.use(express.json())
app.use("/app/v1",route);
app.use("/uploads",express.static("uploads"))
app.use("/uploadsPDF",express.static("uploadsPDF"))


app.listen(port,()=>{
  console.log(`Listening ${port} is successfully`)
})