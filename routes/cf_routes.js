const express = require('express');
const router = express.Router();
const { getUserInfo, getUserRating,
  getUserBlogEntries,
  getSolvedProblemTags,
  getMostUsedLanguage,
  getPerformanceTrend, getUserStatus } = require('../services/cf_service');

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

// user/handle/status
router.get('/user/:handle/status', async (req, res) => {
  console.log("Incoming request for handle:", req.params.handle);
  try {
    const data = await getUserStatus(req.params.handle);
    res.json(data);
  }
  catch (err) {
    console.error("Error in /user/:handle/status:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// user/handle/rating/blog
router.get('/user/:handle/blog', async (req, res) => {
  try {
    const data = await getUserBlogEntries(req.params.handle);
    res.json(data);
  }
  catch (err) {
    console.error("Error fetching blog entries:", err.message);
    res.status(200).json([]);
  }
});

// user/handle/tags
router.get('/user/:handle/tags', async (req, res) => {
  try {
    const data = await getSolvedProblemTags(req.params.handle);
    res.json(data);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// user/handle/language
router.get('/user/:handle/language', async (req, res) => {
  try {
    const data = await getMostUsedLanguage(req.params.handle);
    res.json(data);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// user/handle/trend
router.get('/user/:handle/trend', async (req, res) => {
  try {
    const data = await getPerformanceTrend(req.params.handle);
    res.json(data);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
