export async function fetchUserProfile(handle) {
    const response = await fetch(`/user/${handle}`);
    if (!response.ok) {
        throw new Error("User not found");
    }
    const data = await response.json();
    return data;
}
