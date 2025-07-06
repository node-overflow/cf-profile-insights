export function setLoading(containerId = "profile") {
  const div = document.getElementById(containerId);
  if (div) div.innerHTML = `<p>Loading...</p>`;
}

export function showError(message, containerId = "profile") {
  const div = document.getElementById(containerId);
  if (div) div.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
}

// 1. Profile Info
export function showProfile(data) {
  const div = document.getElementById("profile");
  div.innerHTML = `
    <h3>${data.handle}</h3>
    <p><strong>Rank:</strong> ${data.rank}</p>
    <p><strong>Rating:</strong> ${data.rating}</p>
    <p><strong>Max Rank:</strong> ${data.maxRank}</p>
    <p><strong>Max Rating:</strong> ${data.maxRating}</p>
  `;
}

// 2. Rating History
export function showRatingHistory(data) {
  const div = document.getElementById("ratingHistory");
  div.innerHTML = `<h4>Rating History</h4>`;
  data.forEach(rating => {
    div.innerHTML += `<p>Contest: ${rating.contestName} — ${rating.newRating}</p>`;
  });
}

// 3. Recent Submissions
export function showRecentSubmissions(data) {
  const div = document.getElementById("submissions");
  div.innerHTML = `<h4>Recent Submissions</h4>`;
  data.slice(0, 10).forEach(sub => {
    div.innerHTML += `
      <p>
        ${sub.problem.name} — ${sub.verdict} — ${sub.programmingLanguage}
      </p>`;
  });
}

// 4. Blog Entries
export function showBlogEntries(data) {
  const div = document.getElementById("blogs");
  div.innerHTML = `<h4>User Blog Entries</h4>`;
  data.forEach(entry => {
    div.innerHTML += `
      <p>
        <a href="https://codeforces.com/blog/entry/${entry.id}" target="_blank">${entry.title}</a>
      </p>`;
  });
}

// 5. Tag Frequency
export function showTagFrequency(data) {
  const div = document.getElementById("tags");
  div.innerHTML = `<h4>Solved Problem Tags</h4>`;
  for (const tag in data) {
    div.innerHTML += `<p>${tag}: ${data[tag]}</p>`;
  }
}

// 6. Language Usage
export function showMostUsedLanguage(data) {
  const div = document.getElementById("language");
  div.innerHTML = `<h4>Most Used Language</h4>`;
  div.innerHTML += `<p>${data.language} (${data.count} times)</p>`;
}

// 7. Performance Trend
export function showPerformanceTrend(data) {
  const div = document.getElementById("performance");
  div.innerHTML = `<h4>Performance Trend</h4>`;
  data.forEach(p => {
    div.innerHTML += `<p>${p.contest}: ${p.rating}</p>`;
  });
}
