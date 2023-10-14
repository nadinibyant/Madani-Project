const {
    response
} = require('express')
const controllers = {}
const jwt = require('jsonwebtoken')
const Admin = require('../../models/admin')
const Awardee = require('../../models/awardee')
const multer = require('multer')
const path = require('path')
const Instruksi_tugas = require('../../models/instruksi_tugas')
const Tugas_awardee = require('../../models/tugas_awardee')
const connection = require('../../database')

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'doc', 'tugas'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/msword'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('File Type Not Allowed');
        error.statusCode = 400;
        return cb(error, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
const uploadd = upload.single('file')

const ditugaskanView = async (req, res) => {
    try {
        const findAdmin = await Admin.findOne({
            id_awardee: req.session.id_awardee
        })

        if (!findAdmin) {
            return res.redirect('/login')
        }
        res.render('classroom/awardee/penugasan/ditugaskan')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.ditugaskanView = [verifyToken, ditugaskanView]

const allDataDitugaskan = async (req, res) => {
    const id_awardee = req.session.id_awardee
    connection.query(`SELECT i.*
    FROM instruksi_tugas i
    LEFT JOIN tugas_awardee t ON i.id_instruksi = t.id_instruksi AND t.id_awardee = ${id_awardee}
    WHERE t.id_pengumpulan IS NULL;
    `, (err, results) => {
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
}
controllers.allDataDitugaskan = allDataDitugaskan

const detailPenugasanView = async (req, res) => {
    try {
        const findAdmin = await Admin.findOne({
            id_awardee: req.session.id_awardee
        })

        if (!findAdmin) {
            return res.redirect('/login')
        }
        res.render('classroom/awardee/penugasan/detailPenugasan')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.detailPenugasanView = [verifyToken, detailPenugasanView]

const getDataDetailPenugasan = async (req, res) => {
    const id_instruksi = req.params.id_instruksi

    const id_awardee = req.session.id_awardee

    const findAwardee = await Awardee.findByPk(id_awardee)
    if (findAwardee) {
        const findInstruksi = await Instruksi_tugas.findOne({
            where: {
                id_instruksi: id_instruksi
            }
        })
        if (findInstruksi) {
            const findPengumpulan = await Tugas_awardee.findOne({
                where: {
                    id_instruksi: id_instruksi,
                    id_awardee: id_awardee
                }
            })

            if (findPengumpulan) {
                res.status(200).json({
                    success: true,
                    data: findInstruksi,
                    message: 'Data Instruksi Ditemukan',
                    status: 'Diserahkan'
                })
            } else {
                res.status(200).json({
                    success: true,
                    data: findInstruksi,
                    message: 'Data Instruksi Ditemukan',
                    status: 'Tidak Ada'
                })
            }

        } else {
            res.status(400).json({
                success: false,
                message: 'Data Instruksi Tugas Tidak Ditemukan',
                status: ''
            })
        }
    } else {
        return res.redirect('/login')
    }
}
controllers.getDataDetailPenugasan = getDataDetailPenugasan

const submitPenugasan = async (req,res) => {
    const id_instruksi = req.params.id_instruksi
    const id_awardee = req.session.id_awardee

    const file_pengumpulan = req.file

    if (!file_pengumpulan) {
        res.status(400).json({
            success: false,
            message: 'Tugas Anda Belum Ditambahkan'
        })
    } else {
        const addTugas = await Tugas_awardee.create({
            id_instruksi: id_instruksi,
            id_awardee: id_awardee,
            file_pengumpulan: file_pengumpulan.originalname
        })

        if (addTugas) {
            res.status(200).json({
                success: true,
                message: 'Tugas Berhasil Dikumpulkan',
                data: addTugas
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Tugas Gagal Dikumpulkan'
            })
        }
    }
}
controllers.submitPenugasan = [uploadd,submitPenugasan]

const getNamaAwardee = async (req, res) => {
    const id_awardee = req.session.id_awardee
    const findAwardee = await Awardee.findByPk(id_awardee)
    if (findAwardee) {
        res.status(200).json({
            success: true,
            message: 'Data Awardee Ditemukan',
            nama_awardee: findAwardee.nama_lengkap
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data Awardee Tidak Ditemukan',
            nama_awardee: ''
        })
    }
}
controllers.getNamaAwardee = getNamaAwardee


module.exports = controllers