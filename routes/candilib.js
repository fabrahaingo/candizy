const express = require("express")
const router = express.Router()
const candilibCtrl = require("../controllers/candilib.js")
const auth = require("../middleware/auth")

router.get("/departements", candilibCtrl.getDepartements)
router.post("/pre-inscription", auth, candilibCtrl.preInscriptionCandidat)

module.exports = router;