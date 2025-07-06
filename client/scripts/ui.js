import { renderTagChart } from './charts.js';

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
export function showProfile(data) {
  const div = document.getElementById("profile");
  if (!div || !data) return;

  div.innerHTML = `
    <div class="profile-box">
      <img src="${data.avatar}" alt="${data.handle}'s avatar" class="profile-avatar">
      <div class="profile-info">
        <h3>${data.handle}</h3>
        <p><strong>Rank:</strong> ${data.rank || 'N/A'}</p>
        <p><strong>Rating:</strong> ${data.rating || 'N/A'}</p>
        <p><strong>Max Rank:</strong> ${data.maxRank || 'N/A'}</p>
        <p><strong>Max Rating:</strong> ${data.maxRating || 'N/A'}</p>
      </div>
    </div>
  `;
}

// 2. Rating History
export function showRatingHistory(data) {
  const div = document.getElementById("ratingHistory");
  if (!div || !Array.isArray(data)) return;

  div.innerHTML = `<h4>Rating History</h4>`;
  const content = data.map(rating => `
    <p>Contest: ${rating.contestName} — ${rating.newRating}</p>
  `).join('');
  div.innerHTML += content;
}

// 3. Recent Submissions
export function showRecentSubmissions(data) {
  const div = document.getElementById("submissions");
  if (!div || !Array.isArray(data)) return;

  div.innerHTML = `<h4>Recent Submissions</h4>`;
  const content = data.slice(0, 10).map(sub => `
    <p>${sub.problem.name} — ${sub.verdict} — ${sub.programmingLanguage}</p>
  `).join('');
  div.innerHTML += content;
}

// 4. Blog Entries
export function showBlogEntries(data) {
  const div = document.getElementById("blogs");
  if (!div || !Array.isArray(data)) return;

  div.innerHTML = `<h4>User Blog Entries</h4>`;
  const content = data.map(entry => `
    <p><a href="https://codeforces.com/blog/entry/${entry.id}" target="_blank">${entry.title}</a></p>
  `).join('');
  div.innerHTML += content;
}

// 5. Tag Frequency
export function showTagFrequency(data) {
  const div = document.getElementById("tags");
  if (!div || !data || typeof data !== 'object') return;

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
  if (!div) return;

  div.innerHTML = `<h4>Most Used Language</h4>`;
  if (!language) {
    div.innerHTML += `<p>No data available.</p>`;
    return;
  }

  if (typeof language === 'string') div.innerHTML += `<p>${language}</p>`; 
  else div.innerHTML += `<p>${language.language || 'Unknown'} (${language.count || 0} times)</p>`;
}

// 7. Performance Trend
export function showPerformanceTrend(data) {
  const div = document.getElementById("performance");
  if (!div || !Array.isArray(data)) return;

  div.innerHTML = `<h4>Performance Trend</h4>`;
  const content = data.map(p => `
    <p>${p.contestName}: ${p.newRating} (Δ${p.delta}, Rank: ${p.rank})</p>
  `).join('');
  div.innerHTML += content;
}
