const {
    response
} = require('express')
const Admin = require('../models/admin')
const Awardee = require('../models/awardee')
const controllers = {}
const jwt = require('jsonwebtoken')

const indexView = async (req, res) => {
    res.render('index')
}
controllers.indexView = indexView

const aboutView = async (req, res) => {
    res.render('about')
}
controllers.aboutView = aboutView

const programView = async (req, res) => {
    res.render('program')
}
controllers.programView = programView

const loginView = async (req, res) => {
    res.render('classroom/login')
}
controllers.loginView = loginView

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password


    const findAdmin = await Admin.findOne({
        where:{
            email: email
        }
    })
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Lengkapi Data Inputan!!'
        })
    } else {
        
        if (findAdmin) {
            if (password != findAdmin.password) {
                res.status(400).json({
                    success: false,
                    message: 'Password Salah',
                    role: 'admin'
                })
            } else {

                const id_admin = findAdmin.id_admin
                const email = findAdmin.email

                const token = jwt.sign({
                        id_admin: id_admin,
                        email
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '2h'
                    }
                );

                req.session.id_admin = id_admin

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 2 * 60 * 60 * 1000,
                });

                res.status(200).json({
                    success: true,
                    message: 'Login Berhasil',
                    id_admin: req.session.id_admin,
                    role: 'admin'
                })
            }
        } else {
            const findAwardee = await Awardee.findOne({
                where: {
                    email: email
                }
            })
            if (findAwardee) {
                if (password != findAwardee.password) {
                    res.status(400).json({
                        success: false,
                        message: 'Password Salah',
                        role: 'awardee'
                    })
                } else {
                    const id_awardee = findAwardee.id_awardee
                    const email = findAwardee.email

                    const token = jwt.sign({
                            id_awardee: id_awardee,
                            email
                        },
                        process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '2h'
                        }
                    );

                    req.session.id_awardee = id_awardee

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 2 * 60 * 60 * 1000,
                    });

                    res.status(200).json({
                        success: true,
                        message: 'Login Berhasil',
                        id_awardee: req.session.id_awardee,
                        role: 'awardee'
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Akun Tidak Ditemukan', 
                    role: 'awardee'
                })
            }
        }
    }
}
controllers.login = login

module.exports = controllers