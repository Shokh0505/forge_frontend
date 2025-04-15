"use client";

import getPosts from "@/app/components/Landing_page/_service/getPosts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "@/app/components/Landing_page/Post/Post";
import { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { SkeletonDemo } from "@/app/components/ui/skeletonDemo";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPostsFromAPI = async () => {
            const posts = await getPosts();

            if (posts.message === "error") {
                toast.message(
                    "Error while fetching posts. Please try again later"
                );
            } else {
                setPosts(posts?.data?.results || []);
            }

            setIsLoading(false);
        };

        getPostsFromAPI();
    }, []);

    return (
        <div>
            {isLoading && (
                <>
                    <div className="mt-8 w-[45rem] bg_secondary mx-auto border rounded-md px-2 py-4">
                        We are fetching the posts for you...
                    </div>
                    <SkeletonLanding />
                </>
            )}
            {!isLoading && posts.length === 0 && (
                <div className="mt-8 w-[45rem] bg_secondary mx-auto border rounded-md px-2 py-4">
                    There is no available posts for now.
                </div>
            )}
            {Array.isArray(posts) &&
                posts.map((post, index) => (
                    <div key={index}>
                        <Post post={post} />
                    </div>
                ))}
        </div>
    );
}

function SkeletonLanding() {
    return (
        <>
            <div className="mt-10 flex items-center justify-start pl-14 mx-auto">
                <SkeletonDemo />
            </div>
            <div className="mt-10 flex items-center justify-start pl-14 mx-auto">
                <SkeletonDemo />
            </div>
            <div className="mt-10 flex items-center justify-start pl-14 mx-auto">
                <SkeletonDemo />
            </div>
        </>
    );
}
