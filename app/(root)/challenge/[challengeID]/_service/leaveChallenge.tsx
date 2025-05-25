export default async function leaveChallenge(id: string) {
    try {
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/leaveChallenge/`,
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
