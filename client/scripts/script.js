async function fetchProfile() {
    const handle = document.getElementById("handleInput").value.trim();
    if (!handle) {
        alert("Please enter a cf handle.");
        return;
    }

    const profileDiv = document.getElementById("profile");
    profileDiv.innerHTML = "Loading...";

    try {
        const res = await fetch(`/api/cf/user/${handle}`);
        if (!res.ok) throw new Error("User not found");

        const data = await res.json();

        profileDiv.innerHTML = `
      <h3>${data.handle}</h3>
      <p><strong>Rank:</strong> ${data.rank}</p>
      <p><strong>Rating:</strong> ${data.rating}</p>
      <p><strong>Max Rank:</strong> ${data.maxRank}</p>
      <p><strong>Max Rating:</strong> ${data.maxRating}</p>
    `;
    } catch (err) {
        profileDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
}
