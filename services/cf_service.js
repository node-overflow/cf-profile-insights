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

async function getUserStatus(handle) {
  const res = await axios.get(`${BASE_URL}/user.status?handle=${handle}`);
  const data = res.data;

  if (data.status !== "OK") throw new Error(data.comment || "Unknown CF API error");

  return data.result;
}

async function getUserBlogEntries(handle) {
  const res = await axios.get(`${BASE_URL}/user.blogEntries?handle=${handle}`);
  const data = res.data;

  if (data.status !== "OK") {
    console.warn(`CF API warning: ${data.comment}`);
    return [];
  }

  return data.result;
}

async function getUserAvatarUrl(handle) {
  const user = await getUserInfo(handle);
  return user.titlePhoto || null;
}

async function getContests(includeGym = false) {
  const res = await axios.get(`${BASE_URL}/contest.list?gym=${includeGym}`);
  return res.data.result;
}

async function getContestStandings(contestId, from = 1, count = 10, handles = [], showUnofficial = false) {
  const query = new URLSearchParams({ contestId, from, count, showUnofficial });
  if (handles.length > 0) query.append('handles', handles.join(';'));
  const res = await axios.get(`${BASE_URL}/contest.standings?${query.toString()}`);
  return res.data.result;
}

async function getContestRatingChanges(contestId) {
  const res = await axios.get(`${BASE_URL}/contest.ratingChanges?contestId=${contestId}`);
  return res.data.result;
}

async function getProblemSet(problemsLimit = 1000) {
  const res = await axios.get(`${BASE_URL}/problemset.problems`);
  return res.data.result.problems.slice(0, problemsLimit);
}

async function getProblemStatistics() {
  const res = await axios.get(`${BASE_URL}/problemset.problems`);
  return res.data.result.statistics;
}

async function getBlogEntry(blogEntryId) {
  const res = await axios.get(`${BASE_URL}/blogEntry.view?blogEntryId=${blogEntryId}`);
  return res.data.result;
}

async function getRecentActions(maxCount = 10) {
  const res = await axios.get(`${BASE_URL}/recentActions?maxCount=${maxCount}`);
  return res.data.result;
}

async function getAcceptedSubmissions(handle, count = 1000) {
  const submissions = await getUserStatus(handle);
  return submissions
    .filter(sub => sub.verdict === 'OK')
    .slice(0, count);
}

async function getSolvedTagFrequency(handle, count = 1000) {
  const accepted = await getAcceptedSubmissions(handle, count);
  const tagFreq = {};

  accepted.forEach(sub => {
    if (sub.problem.tags) {
      sub.problem.tags.forEach(tag => {
        tagFreq[tag] = (tagFreq[tag] || 0) + 1;
      });
    }
  });

  return tagFreq;
}

async function getSolvedProblemDifficultyStats(handle, count = 1000) {
  const accepted = await getAcceptedSubmissions(handle, count);
  const diffMap = {};
  accepted.forEach(sub => {
    const rating = sub.problem.rating || 'unrated';
    diffMap[rating] = (diffMap[rating] || 0) + 1;
  });
  return diffMap;
}

async function getMostUsedLanguage(handle, count = 1000) {
  const submissions = await getUserStatus(handle);
  const langCount = {};
  submissions.slice(0, count).forEach(sub => {
    const lang = sub.programmingLanguage || 'Unknown';
    langCount[lang] = (langCount[lang] || 0) + 1;
  });
  const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
  return sorted.length ? sorted[0][0] : null;
}

async function getFastestAcceptedSubmissions(handle, count = 1000, topN = 5) {
  const accepted = await getAcceptedSubmissions(handle, count);
  const withTime = accepted.filter(sub => sub.timeConsumedMillis != null);
  const sorted = withTime.sort((a, b) => a.timeConsumedMillis - b.timeConsumedMillis);
  return sorted.slice(0, topN);
}

async function getSubmissionVerdictCounts(handle, count = 1000) {
  const submissions = await getUserStatus(handle);
  const verdicts = {};
  submissions.slice(0, count).forEach(sub => {
    const verdict = sub.verdict || 'Unknown';
    verdicts[verdict] = (verdicts[verdict] || 0) + 1;
  });
  return verdicts;
}

async function getPerformanceTrend(handle) {
  const ratingChanges = await getUserRating(handle);
  return ratingChanges.map(entry => ({
    contestName: entry.contestName,
    newRating: entry.newRating,
    oldRating: entry.oldRating,
    delta: entry.newRating - entry.oldRating,
    rank: entry.rank
  }));
}

async function getBestContestPerformance(handle) {
  const ratings = await getUserRating(handle);
  if (!ratings.length) return null;

  return ratings.reduce((best, curr) => {
    const delta = curr.newRating - curr.oldRating;
    const bestDelta = best.newRating - best.oldRating;
    return delta > bestDelta ? curr : best;
  });
}

async function getDuplicateSolvedProblems(handle, count = 1000) {
  const accepted = await getAcceptedSubmissions(handle, count);
  const seen = {};
  const duplicates = [];
  accepted.forEach(sub => {
    const key = `${sub.problem.contestId}-${sub.problem.index}`;
    if (seen[key]) duplicates.push(sub);
    else seen[key] = true;
  });
  return duplicates;
}

async function getUniqueSolvedProblemCount(handle, count = 1000) {
  const accepted = await getAcceptedSubmissions(handle, count);
  const unique = new Set();
  accepted.forEach(sub => {
    const id = `${sub.problem.contestId}-${sub.problem.index}`;
    unique.add(id);
  });
  return unique.size;
}

async function getAverageSolvedProblemRating(handle, count = 1000) {
  const accepted = await getAcceptedSubmissions(handle, count);
  const ratings = accepted.map(sub => sub.problem.rating).filter(r => r);
  if (!ratings.length) return null;
  const total = ratings.reduce((sum, r) => sum + r, 0);
  return Math.round(total / ratings.length);
}

async function getUnsolvedAttemptedProblems(handle, count = 1000) {
  const submissions = await getUserStatus(handle);
  const solved = new Set();
  const attempted = new Set();

  for (const sub of submissions.slice(0, count)) {
    const key = `${sub.problem.contestId}-${sub.problem.index}`;
    if (sub.verdict === 'OK') solved.add(key);
    else attempted.add(key);
  }

  return [...attempted].filter(key => !solved.has(key));
}

async function getSolveAttemptsMap(handle, count = 1000) {
  const submissions = await getUserStatus(handle);
  const tries = {};

  for (const sub of submissions.slice(0, count)) {
    const key = `${sub.problem.contestId}-${sub.problem.index}`;
    tries[key] = tries[key] || { attempts: 0, solved: false };
    tries[key].attempts++;
    if (sub.verdict === 'OK') tries[key].solved = true;
  }

  return Object.entries(tries)
    .filter(([_, val]) => val.solved)
    .map(([problemId, val]) => ({ problemId, attempts: val.attempts }));
}

async function getSolvedProblemsGroupedByTag(handle, count = 1000) {
  const accepted = await getAcceptedSubmissions(handle, count);
  const tagMap = {};
  for (const sub of accepted) {
    sub.problem.tags.forEach(tag => {
      tagMap[tag] = tagMap[tag] || [];
      tagMap[tag].push(sub.problem);
    });
  }
  return tagMap;
}

async function findProblemSolveById(handle, contestId, index) {
  const submissions = await getUserStatus(handle);
  return submissions.find(sub =>
    sub.problem.contestId == contestId &&
    sub.problem.index === index &&
    sub.verdict === 'OK'
  ) || null;
}

module.exports = {
  getUserInfo,
  getUserRating,
  getUserStatus,
  getUserBlogEntries,
  getUserAvatarUrl,
  getContests,
  getContestStandings,
  getContestRatingChanges,
  getProblemSet,
  getProblemStatistics,
  getBlogEntry,
  getRecentActions,
  getAcceptedSubmissions,
  getSolvedTagFrequency,
  getSolvedProblemDifficultyStats,
  getMostUsedLanguage,
  getFastestAcceptedSubmissions,
  getSubmissionVerdictCounts,
  getPerformanceTrend,
  getBestContestPerformance,
  getDuplicateSolvedProblems,
  getUniqueSolvedProblemCount,
  getAverageSolvedProblemRating,
  getUnsolvedAttemptedProblems,
  getSolveAttemptsMap,
  getSolvedProblemsGroupedByTag,
  findProblemSolveById
};
