const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/user/selesai')

router.get('/penugasanSelesai', controllers.selesaiView)
router.get('/dataPenugasanSelesai', controllers.dataPenugasanSelesai)
router.get('/deleteTugas/:id_pengumpulan', controllers.deleteTugasSelesai)
router.get('/detailSelesai/:id_instruksi/:id_pengumpulan/:id_awardee', controllers.getDetailSelesai)
router.get('/detailSelesaiView/:id_instruksi/:id_pengumpulan/:id_awardee', controllers.detailSelesaiView)


module.exports = router