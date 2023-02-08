const express = require('express')
const IdolController = require('../controllers/IdolController')
const router = express.Router()

router.get('/', IdolController.showAll)
router.get('/branches', IdolController.showBranches)
router.get('/:id', IdolController.showIdolById)
router.get('/songs/:spotifyId', IdolController.idolSpotify)
router.get('/video/:youtubeId', IdolController.idolYoutube)
router.get('/video/live/:youtubeId', IdolController.idolLiveYoutube)



module.exports = router