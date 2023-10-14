const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const Awardee = sequelize.define('awardee', {
    id_awardee:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }, 
    nomor_penerimaan:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nama_lengkap:{
        type: DataTypes.STRING,
        allowNull: false
    },
    jenis_kelamin:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal_lahir:{
        type: DataTypes.DATE,
        allowNull: false
    },
    no_telp:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'awardee',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Awardee