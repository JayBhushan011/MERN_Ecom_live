const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config()
const app = express();

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
})
);


// DATABASE SETUP //
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
// *******

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


const userRouter = require('./routes/user');
app.use('/user', userRouter);

const productRouter = require('./routes/product');
app.use('/product', productRouter);


app.get("/", function(request, response) {
  response.send("<h1>Hello World!</h1>");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
  console.log(`Server is running at port ${PORT}`);
});
