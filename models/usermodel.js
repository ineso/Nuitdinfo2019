var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('user', {
    iduser: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
    password: {type: Sequelize.STRING(255), allowNull: false, },
    nom: {type: Sequelize.STRING(255), allowNull: true, },
    prenom: {type: Sequelize.STRING(255), allowNull: true, },
    situation:{type: Sequelize.STRING(255), allowNull: true, },
    adresse:{type: Sequelize.STRING(255), allowNull: true, },
    ville: {type: Sequelize.STRING(255), allowNull: true, },
    domaine_etude: {type: Sequelize.STRING(255), allowNull: true} 
},
        {tableName: 'user', timestamps: false, underscored: true}
);
}