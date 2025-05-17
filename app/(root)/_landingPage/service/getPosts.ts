import { QueryFunctionContext } from "@tanstack/react-query";
import { PaginatedPostsResponse } from "@/interfaces/interfaces";

export default async function getPosts({
    pageParam,
}: QueryFunctionContext): Promise<PaginatedPostsResponse> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChallenges?page=${pageParam}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Error fetching posts");
    }

    return await response.json();
}
