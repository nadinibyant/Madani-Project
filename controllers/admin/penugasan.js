const {
    response
} = require('express')
const Admin = require('../../models/admin')
const controllers = {}
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const Instruksi_tugas = require('../../models/instruksi_tugas')
const Tugas_awardee = require('../../models/tugas_awardee')
const Awardee = require('../../models/awardee')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.admin = decoded.id_admin;
        next();
    } catch (error) {
        return res.redirect('/login');
    }
};

const penugasanAdminView = async (req,res) => {
    try {
        const findAdmin = await Admin.findOne({
            id_admin: req.session.id_admin
        })

        if (!findAdmin) {
            return res.redirect('/login')
        }
        res.render('classroom/admin/penugasan')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.penugasanAdminView = [verifyToken,penugasanAdminView]

const detailIntstruksiView = async (req,res) => {
    try {
        const findAdmin = await Admin.findOne({
            id_admin: req.session.id_admin
        })

        if (!findAdmin) {
            return res.redirect('/login')
        }
        res.render('classroom/admin/detailInstruksi')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.detailIntstruksiView = [verifyToken, detailIntstruksiView] 

const addPenugasanView = async (req,res) => {
    try {
        const findAdmin = await Admin.findOne({
            id_admin: req.session.id_admin
        })

        if (!findAdmin) {
            return res.redirect('/login')
        }
        res.render('classroom/admin/addPenugasan')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.addPenugasanView = [verifyToken,addPenugasanView]

const editInstruksiView = async (req,res) => {
    try {
        const findAdmin = await Admin.findOne({
            id_admin: req.session.id_admin
        })

        if (!findAdmin) {
            return res.redirect('/login')
        }
        res.render('classroom/admin/editPenugasan')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.editInstruksiView = [verifyToken, editInstruksiView]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'doc', 'materi'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['application/pdf'];
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

const addPenugasan = async (req,res) => {
    const nama_mentor = req.body.nama_mentor
    const judul_materi = req.body.judul_materi
    const deskripsi_materi = req.body.deskripsi_materi
    const deskripsi_tugas = req.body.deskripsi_tugas
    const tenggat_tugas = req.body.tenggat_tugas
    const file_materi = req.file
    const id_admin = 1

    if (!nama_mentor || !judul_materi) {
        res.status(400).json({
            success: false,
            message: 'Lengkapi Data Nama Mentor atau Judul Materi!'
        })
    } else {
        const addPenugasan = await Instruksi_tugas.create({
            nama_mentor: nama_mentor,
            judul_materi: judul_materi,
            deskripsi_tugas: deskripsi_tugas,
            deskripsi_materi: deskripsi_materi,
            file_materi: file_materi.originalname,
            tenggat_tugas: tenggat_tugas,
            id_admin: id_admin
        })

        if (addPenugasan) {
            res.status(200).json({
                success: true,
                message: 'Penugasan Berhasil Ditambahkan'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Penugasan Gagal Ditambahkan'
            })
        }
    }
}
controllers.addPenugasan = [uploadd,addPenugasan]

const getAllDataPenugasan = async (req,res) => {
    const allPenugasan = await Instruksi_tugas.findAll()

    var id_instruksi = []
    if (allPenugasan.length > 0) {
        const data = allPenugasan.map((dataPenugasan) => ({
            nama_mentor: dataPenugasan.nama_mentor,
            judul_materi: dataPenugasan.judul_materi,
            deskripsi_tugas: dataPenugasan.deskripsi_tugas,
            deskripsi_materi: dataPenugasan.deskripsi_materi,
            tenggat_tugas: dataPenugasan.tenggat_tugas,
            created_at: dataPenugasan.created_at
        }))

        const judul_materi = data.map((dataJudul) => dataJudul.judul_materi)
        for (let index = 0; index < judul_materi.length; index++) {
            const findIdInstruksi = await Instruksi_tugas.findOne({
                where: {
                    judul_materi: judul_materi[index]
                }
            })

            if (findIdInstruksi) {
                id_instruksi.push(findIdInstruksi.id_instruksi)
            }
            
        }
        
        res.status(200).json({
            success: true,
            data: data,
            id_instruksi: id_instruksi,
            message: 'Data Instruksi Ditemukan'
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data Penugasan Belum Tersedia'
        })
    }
}
controllers.getAllDataPenugasan = getAllDataPenugasan

const getDetailDataPenugasan = async (req,res) => {
    const id_instruksi = req.params.id_instruksi

    const findInstruksi = await Instruksi_tugas.findByPk(id_instruksi)

    if (findInstruksi) {
        const nama_mentor = findInstruksi.nama_mentor
        const judul_materi = findInstruksi.judul_materi
        const deskripsi_tugas = findInstruksi.deskripsi_tugas
        const deskripsi_materi = findInstruksi.deskripsi_materi
        const file_materi = findInstruksi.file_materi
        const tenggat_tugas = findInstruksi.tenggat_tugas
        const created_at = findInstruksi.created_at

        res.status(200).json({
            success: true,
            data: {
                nama_mentor: nama_mentor,
                judul_materi: judul_materi,
                deskripsi_tugas: deskripsi_tugas,
                deskripsi_materi: deskripsi_materi,
                file_materi: file_materi,
                tenggat_tugas: tenggat_tugas,
                created_at: created_at
            }
        })
    } else {
        res.status(400).json({
            success: false,
            data:{
                nama_mentor: nama_mentor,
                judul_materi: judul_materi,
                deskripsi_tugas: deskripsi_tugas,
                deskripsi_materi: deskripsi_materi,
                file_materi: file_materi,
                tenggat_tugas: tenggat_tugas,
                created_at: created_at
            },
            message: 'Data Instruksi Penugasan Tidak Ditemukan'
        })
    }
}
controllers.getDetailDataPenugasan = getDetailDataPenugasan

const detailPenugasanTugasView = async (req,res) => {
    res.render('classroom/admin/detailTugas')
}
controllers.detailPenugasanTugasView = [verifyToken, detailPenugasanTugasView] 

const getAllTugasAwardee = async (req,res) => {
    const id_instruksi = req.params.id_instruksi
    const findAll = await Tugas_awardee.findAll({
        where:{
            id_instruksi: id_instruksi,
        }
    })

    if (findAll.length > 0) {
        const dataTugas = findAll.map((tugasAwardee) => ({
            id_awardee: tugasAwardee.id_awardee,
            file_pengumpulan: tugasAwardee.file_pengumpulan,
            created_at: tugasAwardee.created_at,
            status: tugasAwardee.status
        }))

        const id_awardee = dataTugas.map((idAwardee) => idAwardee.id_awardee)
        const namaAwardee = []

        const file_pengumpulan = dataTugas.map((file_pengumpulan) => file_pengumpulan.file_pengumpulan)
        const created_at = dataTugas.map((created) => created.created_at)
        const dataStatus= dataTugas.map((dataStatus) => dataStatus.status)

        for (let index = 0; index < id_awardee.length; index++) {
            const findNama = await Awardee.findOne({
                where:{
                    id_awardee: id_awardee[index]
                }
            })

            if (findNama) {
                namaAwardee.push(findNama.nama_lengkap)
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data Awardee Tidak Ditemukan'
                })
            }
        }
        
        res.status(200).json({
            success: true,
            message: 'Data Tugas Ditemukan',
            file_pengumpulan: file_pengumpulan,
            nama_lengkap: namaAwardee,
            created_at: created_at,
            id_awardee: id_awardee,
            status: dataStatus
        })

        
    } else {
        res.status(400).json({
            success:false,
            message: 'Data Tugas Belum Tersedia'
        })
    }
}
controllers.getAllTugasAwardee = getAllTugasAwardee

const doneTugas = async (req,res) => {
    const id_instruksi = req.params.id_instruksi
    const id_awardee = req.params.id_awardee

    const updateTugas = await Tugas_awardee.update({
        status: 'selesai',
    }, {
        where:{
            id_instruksi: id_instruksi,
            id_awardee: id_awardee
        }
    })

    if (updateTugas) {
        res.status(200).json({
            success: true,
            message: 'Tugas Berhasil Diterima'
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Tugas Gagal Diterima'
        })
    }
}
controllers.doneTugas = doneTugas

const reviewTugas = async (req,res) => {
    const id_instruksi = req.params.id_instruksi
    const id_awardee = req.params.id_awardee

    const findFile = await Tugas_awardee.findOne({
        where:{
            id_instruksi: id_instruksi,
            id_awardee: id_awardee
        }
    })

    const findInstruksi = await Instruksi_tugas.findOne({
        where:{
            id_instruksi: id_instruksi
        }
    })

    if (findInstruksi) {
        const judul = findInstruksi.judul_materi

        if (findFile) {
            const namaFile = findFile.file_pengumpulan
            res.status(200).json({
                success: true,
                message: 'Tugas Ditemukan',
                namaFile:  namaFile,
                judul: judul
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Tugas Tidak Ditemukan'
            })
        }

    } else {
        res.status(400).json({
            success: false,
            message: 'Instruksi Tidak Ditemukan'
        })
    }
    
}
controllers.reviewTugas = reviewTugas

const reviewTugasView = async (req,res) => {
    res.render('classroom/admin/reviewTugas')
}
controllers.reviewTugasView = reviewTugasView

const getNama = async (req,res) =>{
    const id_admin = req.session.id_admin
    const findAdmin = await Admin.findByPk(id_admin)
    if (findAdmin) {
        res.status(200).json({
            success: true,
            nama_admin: findAdmin.nama_admin,
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Nama Admin Tidak ditemukan'
        })
    }
}
controllers.getNama = getNama

const fileMateriView = async (req,res) => {
    res.render('classroom/admin/reviewMateri')
}
controllers.fileMateriView = [verifyToken,fileMateriView]

const editInstruksi = async (req,res) => {
    const id_instruksi = req.params.id_instruksi

    const findInstruksi = await Instruksi_tugas.findByPk(id_instruksi)
    const nama_mentor = req.body.nama_mentor || findInstruksi.nama_mentor
    const judul_materi = req.body.judul_materi || findInstruksi.judul_materi
    const deskripsi_materi = req.body.deskripsi_materi || findInstruksi.deskripsi_materi
    const deskripsi_tugas = req.body.deskripsi_tugas || findInstruksi.deskripsi_tugas
    const tenggat_tugas = req.body.tenggat_tugas || findInstruksi.tenggat_tugas
    const file_materi = req.file || findInstruksi.file_materi

    const updateInstruksi = await Instruksi_tugas.update({
        nama_mentor: nama_mentor,
        judul_materi: judul_materi,
        deskripsi_materi: deskripsi_materi,
        deskripsi_tugas: deskripsi_tugas,
        tenggat_tugas: tenggat_tugas,
        file_materi: file_materi.originalname
    }, {
        where: {
            id_instruksi: id_instruksi
        }
    })

    if (updateInstruksi) {
        res.status(200).json({
            success: true,
            message: 'Data Instruksi Berhasil Diperbaharui'
        })
    } else {
        res.status(400).json({
            success: true,
            message: 'Data Instruksi Tidak Berhaisl Diperbaharui'
        })
    }
} 
controllers.editInstruksi = [uploadd,editInstruksi]

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Gagal logout',
            });
        }

        res.clearCookie('sessionID'); // Hapus cookie sesi jika menggunakan cookie-based session
        return res.status(200).json({
            success: true,
            message: 'Logout berhasil',
        });
    });
}

controllers.logout = [verifyToken, logout]

module.exports = controllers