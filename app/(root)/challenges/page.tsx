"use client";
import { getParticipatedChallenges } from "./service/getParticipatedChallenge";
import { ChallengeParticipatedInterface } from "@/interfaces/interfaces";
import { Challenge } from "./components/challenge";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

export default function Challenges() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["participatedChallenges"],
        queryFn: getParticipatedChallenges,
        retry: 1,
    });

    // just handling the error
    useEffect(() => {
        if (isError) {
            toast.message(
                "Couldn't get the data for participated challenges. Please try again later!"
            );
        }
    }, [isError]);

    const dataChallenges = useMemo(() => {
        return data?.data ?? null;
    }, [data]);

    if (isLoading) return <div className="px-32 mt-12">Loading ...</div>;

    return (
        <div className="px-32 pb-4 mt-12">
            <h2 className="text-3xl font-semibold">My challenges</h2>
            {dataChallenges &&
                dataChallenges.map(
                    (
                        challenge: ChallengeParticipatedInterface,
                        indx: number
                    ) => (
                        <div key={indx} className="mt-8">
                            <Challenge data={challenge} />
                        </div>
                    )
                )}
        </div>
    );
}
