const sequelize = require('../utils/sequelize')
const { Model, DataTypes } = require('sequelize')

class EncryptedDocument extends Model { }

EncryptedDocument.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    key: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},
    {
        sequelize,
        tableName: "encrypted_documents",
        timestamps: false,
    });

EncryptedDocument.sync();
module.exports = EncryptedDocument

