const express = require("express");
const Router= express.Router();
const local = require('../sequelize').local;
const CategorieInteret = require('../sequelize').CategorieInteret;
var sequelize = require('../sequelize').sequelize;
var jwt = require('jsonwebtoken');
const config = require('../configurations/config');
const verifySignUp = require('../configurations/verifySignUp');
const authJwt = require('../configurations/verifyJwtToken');

Router.get("/getAllfoyer",(req,res)=>{
  local.findAll(
    {where: {

      idcateginteret: '1',
      type: 'residence'

    },
   }
  ).then(foyer => {
     res.status(200).json(foyer);
   }).catch(err => {
     res.status(500).json({
       "description": "Can not access Admin Board",
       "error": err
     });
   })
})
Router.get("/getAllresidence",(req,res)=>{
  local.findAll(
    {where: {

      idcateginteret: '1',
      type: 'foyer'

    },
   }
  ).then(foyer => {
     res.status(200).json(foyer);
   }).catch(err => {
     res.status(500).json({
       "description": "Can not access Admin Board",
       "error": err
     });
   })
})
module.exports=Router;