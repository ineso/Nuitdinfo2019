const express = require("express");
const Router= express.Router();
const Image = require('../sequelize').Image;
var sequelize = require('../sequelize').sequelize;
const path = require("path");
const multer = require('multer');
var fs = require("fs")
const upload = multer({dest: __dirname + '/uploads/images'});
//upload sigle pic of user
Router.post('/uploadpic', upload.single('image'), function (req, res) {
    var file = __dirname + '/uploads/' + req.file.originalname;
    fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
        if (err) {
          console.error(err);
          var response = {
            message: 'Sorry, file couldn\'t be uploaded.',
            filename: req.file.originalname
          };
        } else {
          response = {
            message: 'File uploaded successfully',
            filename: req.file.originalname
          };
        //  res.json(response);
        }
        Image.create({
            contentType: req.file.mimetype,
            image: req.file.originalname,
            iduser :req.body.iduser
          }).then(role => {
          res.json({ success: true, message: 'image ajouté avec succcés! ' });// Send success message back to controller/request
           }
           
            ).catch(err => {
            res.status(500).send("Fail! Error -> " + err);
          })
      })
    })
  })


//get pic 
Router.get('/getpic', (req, res) => {
    
      Image.findOne({
        where: {idimage:req.body.id}
      }).then(result => {
     //  res.contentType('image/png');
      //  res.send(__dirname + "/uploads/" + result.image.buffer)
       
      res.sendFile(__dirname + "/uploads/" + result.image)
          
      }).catch(err => {
        res.status(500).json({
          "description": "Can not access User Page",
          "error": err
        });
      })
    })
 
  module.exports = Router;