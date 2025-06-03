"use client";

import getPosts from "@/app/(root)/_landingPage/service/getPosts";
import useLikedIDs from "@/store/likedIDs";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { Post } from "@/app/(root)/_landingPage/components/Post";
import { SkeletonDemo } from "@/components/ui/skeletonDemo";

export default function Posts() {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const { setLikedIDs } = useLikedIDs();

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.next ? lastPage.next : null;
        },
    });

    // Update liked posts
    useEffect(() => {
        if (!data) return;
        const lastPage = data.pages[data.pages.length - 1];
        setLikedIDs(lastPage.likedIDs);
    }, [data]);

    // if user reaches the end of posts, trigger fetching new posts
    useEffect(() => {
        if (!observerRef.current || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetching]);

    return (
        <div>
            {data?.pages
                .flatMap((page) => page.results)
                .map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            <div ref={observerRef}>
                {isFetching && hasNextPage && (
                    <>
                        <div className="h-10 flex justify-center items-center">
                            <div className="text-sm text-gray-500">
                                Loading more posts...
                            </div>
                        </div>
                        <SkeletonLanding />
                    </>
                )}
            </div>

            {!isFetching && data?.pages.length === 0 && (
                <div className="mt-8 w-full  bg_secondary mx-auto border rounded-md px-2 py-4">
                    There is no available posts for now.
                </div>
            )}
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
