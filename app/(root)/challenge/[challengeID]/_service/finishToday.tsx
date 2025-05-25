export default async function finishToday(id: string) {
    try {
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/finishedChallengeToday/`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ id: id }),
            }
        );

        if (!data.ok) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}
