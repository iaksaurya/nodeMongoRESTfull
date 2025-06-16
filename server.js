require('dotenv').config();
var express = require('express');
var server = express();
var routes = require('./routes/route');
var mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true,  useUnifiedTopology: true },function checkDB(error)
{
    if(error)
    {
        console.log("error! MongoDB not connected!")
    }
    else
    {
        console.log("DB Connected!")
    }
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000,function check(error)
{
    if(error)
    {
        console.log("error! server is not running!")
    }
    else
    {
        console.log("server is running!")
    }
});