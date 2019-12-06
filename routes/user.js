const express = require("express");
const Router= express.Router();
const nodemailer = require('nodemailer');
const User = require('../sequelize').User;
const Role = require('../sequelize').Role;
var sequelize = require('../sequelize').sequelize;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const config = require('../configurations/config');
const verifySignUp = require('../configurations/verifySignUp');
const authJwt = require('../configurations/verifyJwtToken');

//create user
Router.post("/createvisiteur",[verifySignUp.checkDuplicateUserNameOrEmail],(req,res)=>{
  var Transport=nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'tickettrack123@gmail.com', 
        pass: 'tickettrack123',

    }
    
    })
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        idrole:'2',
        nom:req.body.nom,
        prenom: req.body.prenom,
        situation:req.body.situation,
        adresse:req.body.adresse,
        ville:req.body.ville,
        domaine_etude:req.body.domaine_etude,
      }).then(user => {
       // const decryptedString = Cryptr.decryptedString(user.password);
        var email = {

          from: 'tickettrack123@gmail.com',
          to: user.email ,
          subject: 'Email de confirmation',
          text:'Hello , thank you for registering at localhost.com. Please click on the following link to complete your activation: http://localhost:8080/activate/',
          html:'thank you for registering at CasaShoes.com Please click on the following link to complete your activation: http://localhost:8080/activate/'
        }
        Transport.sendMail(email, function(err1, info) {
          if (err1) console.log(err1); // If error in sending e-mail, log to console/terminal
      });
      res.json({ success: true, message: 'Un email de confirmation a été envoyé avec succcés! ' });// Send success message back to controller/request
       }
       
        ).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
      })

    })
//login user
Router.get("/loginuser",(req,res)=>{
    User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (!user) {
          return res.status(404).send('User Not Found.');
        }
     
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if (!passwordIsValid) {
          return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
        }
        
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, accessToken: token });
        
      }).catch(err => {
        res.status(500).send('Error -> ' + err);
      });
})
//update user
Router.put('/updateuser',(req,res)=>{
  User.update(
    { email:req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      nom: req.body.nom,
      prenom:req.body.prenom ,
      telephone:req.body.telephone,
      adresse:req.body.adresse,
      ville:req.body.ville,
      codepostal:req.body.codepostal,
      idrole:req.body.idrole
    },
    { where: { iduser:req.body.iduser } }).then(user => {
      res.status(200).json(user);
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    })

})
//delete user
Router.delete('/deleteuser',(req,res)=>{
  User.destroy({
      where: {iduser: req.body.iduser}
    }).then(user => {
      res.status(200).json('user deleted with success');
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    })

})
// count users
Router.get('/countUsers',(req,res)=>{
  User.count().then(results => {
      res.status(200).json(results);
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    })

})
// get user by id and verify token access 
Router.get('/getuserbyid', [authJwt.verifyToken],(req,res)=>{
    User.findOne({
        where: {iduser: req.body.iduser},
        attributes: ['email','role_idrole'],
        include: [{
            model: Role,
            attributes: ['idrole', 'nomrole'],
          }]
       
      }).then(user => {
        res.status(200).json(user);
      }).catch(err => {
        res.status(500).json({
          "description": "Can not access User Page",
          "error": err
        });
      })

})
//gets admins
Router.get("/getadmins",[authJwt.verifyToken],(req,res)=>{
    User.findOne({
        where: {idrole:1},
        attributes: ['email'],
        include: [{
          model: Role,
          attributes: ['idrole', 'nomrole'],
        }]
      }).then(user => {
        res.status(200).json({
          "description": "Admin Board",
          "user": user
        });
      }).catch(err => {
        res.status(500).json({
          "description": "Can not access Admin Board",
          "error": err
        });
      })
})
//get clients
Router.get("/getclients",[authJwt.verifyToken],(req,res)=>{
  User.findOne({
      where: {idrole:2},
      attributes: ['email'],
      include: [{
        model: Role,
        attributes: ['idrole', 'nomrole'],
      }]
    }).then(user => {
      res.status(200).json({
        "description": "Admin Board",
        "user": user
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });
    })
})
//select users from sequelize
Router.get("/countusers",(req,res)=>{
    sequelize.query("select * from user").then(([results, metadata]) => {
        res.send(results)
        console.log(results)
      })
})

module.exports=Router;