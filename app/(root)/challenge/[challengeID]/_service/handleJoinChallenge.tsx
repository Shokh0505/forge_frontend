export default async function joinChallenge(id: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/joinChallenge/`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ id: id }),
            }
        );

        if (!res.ok) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}
