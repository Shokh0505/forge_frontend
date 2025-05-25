export async function getParticipatedChallenges() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getParticipatedChallenges/`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!res.ok) {
        throw new Error("Couldn't get the challenges");
    }

    const data = await res.json();
    return data || [];
}
