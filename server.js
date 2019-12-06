const mysql = require("mysql");
const express = require("express");
var logger = require('morgan');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const sequelize= require("./sequelize");
const ImageRoutes = require("./routes/image")
const userRoutes = require("./routes/user");
const RoleRoutes = require("./routes/role");
const localRoutes = require("./routes/local");

var cors =require('cors')

var app = express();
/******************************************************* */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

/**************************** */
//bodyParser
app.use(bodyParser.json());
//logger
app.use(logger('dev'));
//  Route
app.use("/user",userRoutes);
app.use("/local",localRoutes);
app.use("/role",RoleRoutes);
app.use("/image",ImageRoutes);

//cors
app.get('/', cors(),function(req, res){
    res.send('okkk');
});


/*************************** */
// handle errors
app.use(function(err, req, res, next) {
    console.log(err);

    if(err.status === 404)
        res.status(404).json({message: "Not found"});
       //res.status(404).send('not found')
    else
        res.status(500).json({message: "verfier vos données"});
});



app.listen(3000, function(){
    console.log('Node server listening on port 3000');
});