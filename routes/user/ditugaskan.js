const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/user/ditugaskan')

router.get('/ditugaskan', controllers.ditugaskanView)
router.get('/allDataDitugaskan', controllers.allDataDitugaskan)
router.get('/detailPenugasan/:id_instruksi', controllers.detailPenugasanView)
router.get('/getDetailPenugasan/:id_instruksi', controllers.getDataDetailPenugasan)
router.post('/submitPenugasan/:id_instruksi', controllers.submitPenugasan)
router.get('/getNamaAwardee', controllers.getNamaAwardee)



module.exports = router