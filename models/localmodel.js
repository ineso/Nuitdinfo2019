var Sequelize = require('sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('local', {
        idlocal: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nomlocal: {type: Sequelize.STRING(255), allowNull: false},
        type: {type: Sequelize.STRING(255), allowNull: false},
        adresse: {type: Sequelize.STRING(255), allowNull: false},
        ville: {type: Sequelize.STRING(255), allowNull: false},
    },
            {tableName: 'local', timestamps: false, underscored: true}//par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
    );
}