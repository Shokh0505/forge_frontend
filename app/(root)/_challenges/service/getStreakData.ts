export default async function getStreakData(id: string) {
    const payload = {
        challengeID: id,
        date: new Date().toISOString().split("T")[0],
    };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChallengeStreak/`,
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(payload),
        }
    );

    if (!res.ok) {
        return [];
    }

    const streakData = await res.json();

    return streakData.data;
}
