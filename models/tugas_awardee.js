const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
const Awardee = require('./awardee')
const Instruksi_tugas = require('./instruksi_tugas')

const Tugas_awardee = sequelize.define('tugas_awardee', {
    id_pengumpulan:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_instruksi:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Instruksi_tugas,
            key: 'id_instruksi'
        }
    },
    id_awardee:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Awardee,
            key: 'id_awardee'
        }
    },
    file_pengumpulan:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
}, {
    tableName: 'tugas_awardee',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Tugas_awardee