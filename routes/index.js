const login = require ('./login')
const penugasanAdmin = require('./admin/penugasan')
const ditugaskan = require('./user/ditugaskan')
const selesai = require('./user/selesai')

const server = {}
server.login = login
server.penugasanAdmin = penugasanAdmin
server.ditugaskan = ditugaskan
server.selesai = selesai

module.exports = server
