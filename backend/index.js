const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}) ); 

const dbConnect =  require("./config/database");
dbConnect();

const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(cors());

const userRoutes = require("./routes/userRoute");
app.use("/api/v1/auth",userRoutes);

app.get("/" , (req,res) => {
    return res.json({
        success:true,
        message:"Your server is running"
    })
})

app.listen(PORT,() => {
    console.log(`App is running at port ${PORT}`);
})