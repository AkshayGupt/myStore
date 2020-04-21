require('dotenv').config();
const mongoose= require("mongoose");
const express = require("express");
const app = express();
const cors= require("cors");
const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");
const authRoutes= require("./routes/auth");


//database connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED SUCCESSFULLY!!");
}).catch(()=>{
    console.log("DB CONNECTION FAILED!");
});


//middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());//if we had to load binary data like audio or images we had to use bodyparser.urlEncoded() instead.


app.use("/api",authRoutes);

// port 
const port = process.env.PORT ||5000;

//server launching
app.listen(port,(req,res)=>{
    console.log(`Server is running at ${port}`);
});

