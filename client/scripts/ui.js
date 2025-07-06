import { renderTagChart, renderMostUsedLanguageChart } from './charts.js';
import { renderTagHeatmap } from './heatmaps.js';

export function setLoading(containerId = "profile") {
  const div = document.getElementById(containerId);
  if (div) {
    div.innerHTML = `<p>Loading...</p>`;
  }
}

export function showError(message, containerId = "profile") {
  const div = document.getElementById(containerId);
  if (div) {
    div.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
  }
}

// 1. Profile Info
export async function showProfile(data) {
  const div = document.getElementById("profile");
  if (!div || !data) return;

  // Fetch user submissions
  const res = await fetch(`https://codeforces.com/api/user.status?handle=${data.handle}`);
  const submissions = (await res.json()).result;

  const totalSolved = new Set(
    submissions
      .filter(s => s.verdict === "OK")
      .map(s => `${s.problem.contestId}-${s.problem.index}`)
  ).size;

  div.innerHTML = `
    <div class="profile-box">
      <img src="${data.avatar}" alt="${data.handle}'s avatar" class="profile-avatar">
      <div class="profile-info">
        <h3>${data.handle}</h3>
        <p><strong>Name:</strong> ${data.firstName || ''} ${data.lastName || ''}</p>
        <p><strong>Country:</strong> ${data.country || 'N/A'}</p>
        <p><strong>City:</strong> ${data.city || 'N/A'}</p>
        <p><strong>Organization:</strong> ${data.organization || 'N/A'}</p>
        <p><strong>Total Problems Solved:</strong> ${totalSolved}</p>
        <p><strong>Rank:</strong> ${data.rank || 'N/A'}</p>
        <p><strong>Rating:</strong> ${data.rating || 'N/A'}</p>
        <p><strong>Max Rank:</strong> ${data.maxRank || 'N/A'}</p>
        <p><strong>Max Rating:</strong> ${data.maxRating || 'N/A'}</p>
        <p><strong>Contribution:</strong> ${data.contribution}</p>
        <p><strong>Friends:</strong> ${data.friendOfCount}</p>
        <p><strong>Last Online:</strong> ${new Date(data.lastOnlineTimeSeconds * 1000).toLocaleString()}</p>
        <p><strong>Joined:</strong> ${new Date(data.registrationTimeSeconds * 1000).toLocaleString()}</p>
        <p><a href="https://codeforces.com/profile/${data.handle}" target="_blank">View Full Profile</a></p>
      </div>
    </div>
  `;
}

// 2. Rating History
export function showRatingHistory(data) {
  const div = document.getElementById("ratingHistory");
  if (!div || !Array.isArray(data) || data.length === 0) return;

  const content = data.map(rating => {
    if (!rating.contestName || rating.newRating === undefined) return '';
    return `<p>Contest: ${rating.contestName} — ${rating.newRating}</p>`;
  }).filter(Boolean).join('');

  if (!content) return;

  div.innerHTML = `<h4>Rating History</h4>` + content;
}

// 3. Recent Submissions
export function showRecentSubmissions(data) {
  const div = document.getElementById("submissions");
  if (!div || !Array.isArray(data) || data.length === 0) return;

  const content = data.slice(0, 4).map(sub => {
    const name = sub.problem?.name;
    const verdict = sub.verdict;
    const lang = sub.programmingLanguage;

    if (!name || !verdict || !lang) return '';

    return `
      <div class="submission-card">
        <h5 class="problem-name">${name}</h5>
        <p>
          <span class="verdict ${verdict.toLowerCase()}">${verdict}</span>
          <span class="lang">${lang}</span>
        </p>
      </div>
    `;
  }).filter(Boolean).join('');

  if (!content) return;

  div.innerHTML = `
    <h4>Recent Submissions</h4>
    <div class="submission-grid">${content}</div>
  `;
}

// 4. Blog Entries
export function showBlogEntries(data) {
  const div = document.getElementById("blogs");
  if (!div || !Array.isArray(data) || data.length === 0) return;

  const content = data.map(entry => {
    if (!entry.id || !entry.title) return '';
    return `<p><a href="https://codeforces.com/blog/entry/${entry.id}" target="_blank">${entry.title}</a></p>`;
  }).filter(Boolean).join('');

  if (!content) return;

  div.innerHTML = `<h4>User Blog Entries</h4>` + content;
}

// 5. Tag Frequency
export function showTagFrequency(data) {
  const div = document.getElementById("tags");
  if (!div || !data || typeof data !== 'object' || Object.keys(data).length === 0) return;

  div.innerHTML = `
    <h4>Solved Problem Tags</h4>
    <div style="max-width: 500px;">
      <canvas id="tagsChart"></canvas>
    </div>
  `;
  renderTagChart(data);
}

// 6. Language Usage
export function showMostUsedLanguage(language) {
  const div = document.getElementById("language");
  if (!div || !language) return;

  div.innerHTML = `
    <h4>Most Used Language</h4>
    <div id="languageText"></div>
    <div style="max-width: 400px;">
      <canvas id="languageChart"></canvas>
    </div>
  `;

  const infoDiv = document.getElementById("languageText");

  if (typeof language === 'string') {
    infoDiv.innerHTML = `<p>${language}</p>`;
    renderMostUsedLanguageChart(language);
  }
  else if (typeof language === 'object' && language.language && language.count !== undefined) {
    infoDiv.innerHTML = `<p>${language.language} (${language.count} times)</p>`;
    renderMostUsedLanguageChart(language);
  }
  else infoDiv.innerHTML = `<p>No data available.</p>`;
}

// 7. Heatmaps
export function showTagHeatmap(submissions) {
  const div = document.getElementById("tagHeatmap");
  if (!div || !Array.isArray(submissions) || submissions.length === 0) return;

  div.innerHTML = `
    <h4>Tag Heatmap</h4>
    <div style="overflow-x:auto; max-width: 100%;">
      <canvas id="tagHeatmapCanvas"></canvas>
    </div>
  `;

  console.log("Real submissions:", submissions);


  renderTagHeatmap("tagHeatmapCanvas", submissions);
}

// 8. Performance Trend
export function showPerformanceTrend(data) {
  const div = document.getElementById("performance");
  if (!div || !Array.isArray(data) || data.length === 0) return;

  const content = data.map(p => {
    if (!p.contestName || p.newRating === undefined || p.delta === undefined || p.rank === undefined) return '';
    return `<p>${p.contestName}: ${p.newRating} (Δ${p.delta}, Rank: ${p.rank})</p>`;
  }).filter(Boolean).join('');

  if (!content) return;

  div.innerHTML = `<h4>Performance Trend</h4>` + content;
}
