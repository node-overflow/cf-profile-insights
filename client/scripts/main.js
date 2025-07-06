import {
    fetchUserProfile,
    fetchUserRating,
    fetchUserStatus,
    fetchUserBlogEntries,
    fetchSolvedProblemTags,
    fetchMostUsedLanguage,
    fetchPerformanceTrend
} from './api.js';

import {
    setLoading,
    showProfile,
    showRatingHistory,
    showRecentSubmissions,
    showBlogEntries,
    showTagFrequency,
    showTagHeatmap,
    showMostUsedLanguage,
    showPerformanceTrend,
    showError
} from './ui.js';

async function fetchEverything() {
    const handleInput = document.getElementById("handleInput");
    if (!handleInput) {
        console.error("Input element #handleInput not found.");
        return;
    }

    const handle = handleInput.value.trim();
    if (!handle) {
        alert("Please enter a Codeforces handle!");
        return;
    }

    setLoading("profile");

    try {
        const [
            profile,
            rating,
            submissions,
            blogs,
            tags,
            language,
            trend
        ] = await Promise.all([
            fetchUserProfile(handle),
            fetchUserRating(handle),
            fetchUserStatus(handle),
            fetchUserBlogEntries(handle),
            fetchSolvedProblemTags(handle),
            fetchMostUsedLanguage(handle),
            fetchPerformanceTrend(handle)
        ]);

        showProfile(profile);
        showRatingHistory(rating);
        showRecentSubmissions(submissions);
        showBlogEntries(blogs);
        showTagFrequency(tags);
        showTagHeatmap(submissions);
        showMostUsedLanguage(language);
        showPerformanceTrend(trend);
    } catch (err) {
        console.error("Error fetching user data:", err);
        showError(err.message || "Something went wrong.");
    }
}

const fetchBtn = document.getElementById("fetchBtn");
if (fetchBtn) fetchBtn.addEventListener("click", fetchEverything);
else console.warn("Button #fetchBtn not found in DOM.");
