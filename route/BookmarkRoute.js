const express = require('express');
const BookmarkController = require('../controller/BookmarkController');

const router = express.Router();

router.post('/create-bookmark', BookmarkController.createCartRecord);
router.put('/update-bookmark/:id', BookmarkController.updateCartRecord);
router.delete('/delete-bookmark/:id', BookmarkController.createCartRecord);
router.get('/find-bookmark-by-id/:id', BookmarkController.findAllCartRecords);
router.get('/find-all-bookmark', BookmarkController.findAllCartRecords);

module.exports = router;