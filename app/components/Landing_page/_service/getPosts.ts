export default async function getPosts(page = 1) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChallenges?page=` + page,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        return { message: "error" };
    }

    const data = await response.json();
    return { message: "success", data: data };
}
