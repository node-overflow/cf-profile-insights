const express = require('express');
const router = express.Router();
const {
  getUserInfo,
  getUserRating,
  getUserBlogEntries,
  getMostUsedLanguage,
  getPerformanceTrend,
  getUserStatus,
  getSolvedTagFrequency
} = require('../services/cf_service');

// GET /user/:handle
router.get('/user/:handle', async (req, res) => {
  try {
    const user = await getUserInfo(req.params.handle);
    res.json(user);
  } catch (err) {
    console.error(`Error fetching user info for ${req.params.handle}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /user/:handle/rating
router.get('/user/:handle/rating', async (req, res) => {
  try {
    const ratingHistory = await getUserRating(req.params.handle);
    res.json(ratingHistory);
  } catch (err) {
    console.error(`Error fetching rating for ${req.params.handle}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /user/:handle/status
router.get('/user/:handle/status', async (req, res) => {
  try {
    const data = await getUserStatus(req.params.handle);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching status for ${req.params.handle}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /user/:handle/blog
router.get('/user/:handle/blog', async (req, res) => {
  try {
    const data = await getUserBlogEntries(req.params.handle);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching blog entries for ${req.params.handle}:`, err.message);
    res.status(200).json([]);
  }
});

// GET /user/:handle/tags
router.get('/user/:handle/tags', async (req, res) => {
  try {
    const data = await getSolvedTagFrequency(req.params.handle);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching tags for ${req.params.handle}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /user/:handle/language
router.get('/user/:handle/language', async (req, res) => {
  try {
    const data = await getMostUsedLanguage(req.params.handle);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching language for ${req.params.handle}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /user/:handle/trend
router.get('/user/:handle/trend', async (req, res) => {
  try {
    const data = await getPerformanceTrend(req.params.handle);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching trend for ${req.params.handle}:`, err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
