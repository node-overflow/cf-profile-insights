async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
  return res.json();
}

export async function fetchUserProfile(handle) {
  return fetchJSON(`/user/${handle}`);
}

export async function fetchUserRating(handle) {
  return fetchJSON(`/user/${handle}/rating`);
}

export async function fetchUserStatus(handle) {
  return fetchJSON(`/user/${handle}/status`);
}

export async function fetchUserBlogEntries(handle) {
  return fetchJSON(`/user/${handle}/blog`);
}

export async function fetchContests() {
  return fetchJSON(`/contests`);
}

export async function fetchContestStandings(contestId) {
  return fetchJSON(`/contest/${contestId}/standings`);
}

export async function fetchContestRatingChanges(contestId) {
  return fetchJSON(`/contest/${contestId}/rating-changes`);
}

export async function fetchProblemSet() {
  return fetchJSON(`/problemset`);
}

export async function fetchProblemStatistics() {
  return fetchJSON(`/problemset/stats`);
}

export async function fetchBlogEntry(blogEntryId) {
  return fetchJSON(`/blog/${blogEntryId}`);
}

export async function fetchRecentActions() {
  return fetchJSON(`/recent-actions`);
}

export async function fetchAcceptedSubmissions(handle) {
  return fetchJSON(`/user/${handle}/accepted`);
}

export async function fetchSolvedProblemTags(handle) {
  return fetchJSON(`/user/${handle}/tags`);
}

export async function fetchSolvedProblemDifficultyStats(handle) {
  return fetchJSON(`/user/${handle}/difficulty`);
}

export async function fetchMostUsedLanguage(handle) {
  return fetchJSON(`/user/${handle}/language`);
}

export async function fetchFastestAcceptedSubmissions(handle) {
  return fetchJSON(`/user/${handle}/fastest`);
}

export async function fetchSubmissionVerdictCounts(handle) {
  return fetchJSON(`/user/${handle}/verdicts`);
}

export async function fetchSolvedTagFrequency(handle) {
  return fetchJSON(`/user/${handle}/tags-frequency`);
}

export async function fetchPerformanceTrend(handle) {
  return fetchJSON(`/user/${handle}/trend`);
}

export async function fetchBestContestPerformance(handle) {
  return fetchJSON(`/user/${handle}/best-contest`);
}

export async function fetchDuplicateSolvedProblems(handle) {
  return fetchJSON(`/user/${handle}/duplicates`);
}

export async function fetchUniqueSolvedProblemCount(handle) {
  return fetchJSON(`/user/${handle}/unique-count`);
}

export async function fetchAverageSolvedProblemRating(handle) {
  return fetchJSON(`/user/${handle}/avg-rating`);
}

export async function fetchUnsolvedAttemptedProblems(handle) {
  return fetchJSON(`/user/${handle}/unsolved`);
}

export async function fetchSolveAttemptsMap(handle) {
  return fetchJSON(`/user/${handle}/attempts`);
}

export async function fetchSolvedProblemsGroupedByTag(handle) {
  return fetchJSON(`/user/${handle}/grouped-tags`);
}

export async function fetchProblemById(problemId) {
  return fetchJSON(`/problem/${problemId}`);
}
