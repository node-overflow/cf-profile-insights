const axios = require('axios');

const BASE_URL = 'https://codeforces.com/api';

async function getUserInfo(handle) {
  const res = await axios.get(`${BASE_URL}/user.info?handles=${handle}`);
  return res.data.result[0];
}

async function getUserRating(handle) {
  const res = await axios.get(`${BASE_URL}/user.rating?handle=${handle}`);
  return res.data.result;
}

module.exports = { getUserInfo, getUserRating };
