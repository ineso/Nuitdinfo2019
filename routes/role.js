const express = require("express");
const Router= express.Router();
const Role = require('../sequelize').Role;
var sequelize = require('../sequelize').sequelize;
var jwt = require('jsonwebtoken');
const config = require('../configurations/config');
const verifySignUp = require('../configurations/verifySignUp');
const authJwt = require('../configurations/verifyJwtToken');
//create role
Router.post("/createrole/iduser",(req,res)=>{
      Role.create({
          nomrole:req.body.nomrole
        }).then(role => {
        res.json({ success: true, message: 'role ajouté avec succcés! ' });// Send success message back to controller/request
         }
         
          ).catch(err => {
          res.status(500).send("Fail! Error -> " + err);
        })
  
      })

//update role
Router.put('/updaterole',(req,res)=>{
    Role.update(
      {  nomrole:req.body.nomrole },
      { where: { idrole:req.params.idrole } }).then(role => {
        res.status(200).json(role);
      }).catch(err => {
        res.status(500).json({
          "description": "Can not access User Page",
          "error": err
        });
      })
  
  })
//delete role
  Router.delete('/deleterole',(req,res)=>{
    Role.destroy({
        where: {idrole: req.body.idrole}
      }).then(role => {
        res.status(200).json('role a été supprimé');
      }).catch(err => {
        res.status(500).json({
          "description": "Can not access User Page",
          "error": err
        });
      })
  
  })

//get roles
Router.get("/getAllroles",(req,res)=>{
     Role.findAll().then(role => {
        res.status(200).json(role);
      }).catch(err => {
        res.status(500).json({
          "description": "Can not access Admin Board",
          "error": err
        });
      })
  })
module.exports=Router;