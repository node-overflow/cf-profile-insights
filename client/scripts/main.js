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
    showMostUsedLanguage,
    showPerformanceTrend,
    showError
} from './ui.js';

async function fetchEverything() {
    const handle = document.getElementById("handleInput").value.trim();
    if (!handle) {
        alert("Enter Codeforces handle!");
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
        showMostUsedLanguage(language);
        showPerformanceTrend(trend);

    }
    catch (err) {
        showError(err.message);
    }
}

document.getElementById("fetchBtn").addEventListener("click", fetchEverything);
