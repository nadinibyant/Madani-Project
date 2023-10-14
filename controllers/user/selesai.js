const {
    response
} = require('express')
const controllers = {}
const jwt = require('jsonwebtoken')
const Admin = require('../../models/admin')
const Tugas_awardee = require('../../models/tugas_awardee')
const connection = require('../../database')
const Awardee = require('../../models/awardee')
const Instruksi_tugas = require('../../models/instruksi_tugas')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.awardee = decoded.id_awardee;
        next();
    } catch (error) {
        return res.redirect('/login');
    }
};

const selesaiView = async (req,res) => {
    try {
        const findAdmin = await Admin.findOne({
            id_awardee: req.session.id_awardee
        })

        if (!findAdmin) {
            return res.redirect('/login')
        }
        res.render('classroom/awardee/penugasan/selesai')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.selesaiView = [verifyToken,selesaiView]

const dataPenugasanSelesai = async (req,res) => {
    const id_awardee = req.session.id_awardee

    const findAwardee = await Awardee.findByPk(id_awardee)
    if (findAwardee) {
        connection.query(`SELECT instruksi_tugas.judul_materi, tugas_awardee.created_at, instruksi_tugas.id_instruksi, tugas_awardee.id_pengumpulan, tugas_awardee.id_awardee FROM tugas_awardee JOIN instruksi_tugas ON tugas_awardee.id_instruksi = instruksi_tugas.id_instruksi WHERE tugas_awardee.id_awardee = ${id_awardee};`, (err, results) => {
            if (err) {
                console.error('Error saat menjalankan query: ', err);
                res.status(500).json({
                    success: false,
                    error: 'Terjadi kesalahan server'
                });
                return;
            } else {
                res.status(200).json({
                    success: true,
                    results: results
                })
            }
        })
    } else {
        return res.redirect('/login')
    }
}
controllers.dataPenugasanSelesai = dataPenugasanSelesai

const detailSelesaiView = async (req,res) => {
    try {
        const findAwardee = await Awardee.findOne({
            id_awardee: req.session.id_awardee
        })

        if (!findAwardee) {
            return res.redirect('/login')
        }
        res.render('classroom/awardee/penugasan/detailSelesai')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.detailSelesaiView = detailSelesaiView

const getDetailSelesai = async (req,res) => {
    const id_instruksi = req.params.id_instruksi
    const id_awardee = req.session.id_awardee
    const id_pengumpulan = req.params.id_pengumpulan

    const findAwardee = await Awardee.findOne({
        where:{
            id_awardee: id_awardee
        }
    })
    if (findAwardee) {
        const instruksi = await Instruksi_tugas.findOne({
            where:{
                id_instruksi: id_instruksi
            }
        })

        if (instruksi) {
            const pengumpulan = await Tugas_awardee.findOne({
                where:{
                    id_pengumpulan: id_pengumpulan
                }
            })
            if (pengumpulan) {
                const status = pengumpulan.status
                if (status == 'selesai') {
                    res.status(200).json({
                        success: true,
                        instruksi: instruksi,
                        pengumpulan: pengumpulan,
                        disable: true
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        instruksi: instruksi,
                        pengumpulan: pengumpulan,
                        disable: false
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data pengumpulan tugas tidak ditemukan'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data instruksi tidak ditemukan'
            })
        }
    } else {
        return res.redirect('/login')
    }
}
controllers.getDetailSelesai = getDetailSelesai

const deleteTugasSelesai = async (req,res) => {
    const id_pengumpulan = req.params.id_pengumpulan

    const deleteTugas = await Tugas_awardee.destroy({
        where:{
            id_pengumpulan: id_pengumpulan
        }
    })

    if (deleteTugas) {
        res.status(200).json({
            success: true,
            message:'Tugas Berhasil Dihapus'
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Tugas Tidak Berhasil Dihapus'
        })
    }
}
controllers.deleteTugasSelesai = deleteTugasSelesai



module.exports = controllers