// import and use express
const express = require("express");
const app = express();
app.use(express.json());

//import and use cors
const cors = require("cors");
app.use(cors());

// dotenv  use to crete env file for secret code.
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 8080;

// //body parser
const bodyParser = require("body-parser");

//import database connection file.
const connect = require("./database/connection");
connect();

// routes
app.use("/api", require("./router/router"));

// if(process.env.NODE_ENV == "porduction"){
//   app.use(express.static("client/build"));
//   app.get("*", (res, req)=>{
//     res.sendFile(path.resolve(__dirname, "../client","build","index.html"));
//   })
// }

//starting server at port 3001
app.listen(process.env.PORT || 3001, () => {
  console.log("you are connected");
});

// mongodb://localhost:27017/taskProject?readPreference=primary&appname=MongoDB%20Compass&ssl=false


// mongodb+srv://Wasif:WasifAleem33@database.vxmtqzs.mongodb.net/taskDB?retryWrites=true&w=majority
