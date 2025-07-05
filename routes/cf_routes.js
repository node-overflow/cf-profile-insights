const express = require('express');
const router = express.Router();
const { getUserInfo, getUserRating } = require('../services/cf_service');

// user/handle
router.get('/user/:handle', async (req, res) => {
  try {
    const user = await getUserInfo(req.params.handle);
    res.json(user);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// user/handle/rating
router.get('/user/:handle/rating', async (req, res) => {
  try {
    const ratingHistory = await getUserRating(req.params.handle);
    res.json(ratingHistory);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
