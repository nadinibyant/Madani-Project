const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
const Admin = require('./admin')

const Instruksi_tugas = sequelize.define('instruksi_tugas', {
    id_instruksi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    nama_mentor:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    judul_materi:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    deskripsi_tugas:{
        type: DataTypes.STRING,
        allowNull: true
    },
    deskripsi_materi:{
        type: DataTypes.STRING,
        allowNull: true
    },
    file_materi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tenggat_tugas:{
        type: DataTypes.DATE,
        allowNull: true
    },
    id_admin:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Admin,
            key: 'id_admin'
        }
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'instruksi_tugas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Instruksi_tugas