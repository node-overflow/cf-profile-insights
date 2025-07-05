import { fetchUserProfile } from './api.js';
import { setLoading, showProfile, showError } from './ui.js';

async function fetchProfile() {
    const handle = document.getElementById("handleInput").value.trim();
    if (!handle) {
        alert("Please enter a cf handle.");
        return;
    }

    setLoading();

    try {
        const data = await fetchUserProfile(handle);
        showProfile(data);
    }
    catch (err) { showError(err.message); }
}

document.getElementById("fetchBtn").addEventListener("click", fetchProfile);
