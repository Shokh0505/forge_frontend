export async function handleCreateChallengeSubmit(formData) {
    try {
        const res = await fetch("api/createChallenge/", {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (!res.ok) {
            return false
        }

        return true
    } catch {
        return false
    }
}   