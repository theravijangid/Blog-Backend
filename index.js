
const express = require("express");
const app = express();


require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(` App started successfull on PORT: ${PORT}`)
})


//middleware to parse json request body
app.use(express.json());

//import routes for TODO APi
const blogRoutes = require("./routes/blogRoutes");

//mount the todo API routes
app.use("/api/v1", blogRoutes);


//connecting to database
const dbConnect = require("./config/database");
dbConnect();

//craeting a default route
app.get("/", (req,res) => {
    res.send("<h1>This is Homepage...</h1>");
})