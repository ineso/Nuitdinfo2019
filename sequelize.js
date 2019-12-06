var Sequelize = require('sequelize');
const UserModel = require('./models/usermodel');
const RoleModel = require('./models/rolemodel');
const ImageModel = require('./models/imagemodel');
const Localmodel = require('./models/localmodel');
const CategorieInteretmodel = require('./models/categorieInteret');
const Ressourcemodel = require('./models/resources');
var sequelize = new Sequelize('web_db', 'root', '', {
host: 'localhost',
dialect: 'mysql',
logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  //on exporte pour utiliser notre connexion depuis les autre fichiers.

exports.sequelize = sequelize;
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Image = ImageModel(sequelize,Sequelize);
const local = Localmodel(sequelize,Sequelize);
const CategorieInteret =CategorieInteretmodel(sequelize,Sequelize);
const Ressource = Ressourcemodel(sequelize,Sequelize);
User.belongsTo(Role,
   {
  hooks: true,
  foreignKey: {
    name: 'idrole',
    allowNull: false
  },
});//l'utilisateur à un rôle
local.belongsTo(CategorieInteret,
  {
 hooks: true,
 foreignKey: {
   name: 'idcateginteret',
   allowNull: false
 },
});//l'utilisateur à un rôle
Ressource.belongsTo(CategorieInteret,
  {
 hooks: true,
 foreignKey: {
   name: 'idcateginteret',
   allowNull: false
 },
});//l'utilisateur à un rôle



/*Image.belongsTo(User,
  {
 hooks: true,
 foreignKey: {
   name: 'iduser',
   allowNull: true
 },
});*/
sequelize.sync({ force: false })
  .then(() => {
    //console.log(`Database & tables created!`)
  })

  exports.sequelize = sequelize;
  exports.User = User;
  exports.Role = Role;
  exports.Image = Image;
  exports.local= local;
  exports.Ressource= Ressource;
  exports.CategorieInteret = CategorieInteret;

