export function setLoading() {
    const profileDiv = document.getElementById("profile");
    profileDiv.innerHTML = "Loading...";
}

export function showProfile(data) {
    const profileDiv = document.getElementById("profile");

    profileDiv.innerHTML = `
    <h3>${data.handle}</h3>
    <p><strong>Rank:</strong> ${data.rank}</p>
    <p><strong>Rating:</strong> ${data.rating}</p>
    <p><strong>Max Rank:</strong> ${data.maxRank}</p>
    <p><strong>Max Rating:</strong> ${data.maxRating}</p>
  `;
}

export function showError(message) {
    const profileDiv = document.getElementById("profile");
    profileDiv.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
}
