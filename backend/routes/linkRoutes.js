const express = require('express')
const router = express.Router()
const {
  getLinks,
  setLink,
  updateLink,
  deleteLink,
} = require('../controllers/linkController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getLinks).post(protect, setLink)
router.route('/:id').delete(protect, deleteLink).put(protect, updateLink)

module.exports = router