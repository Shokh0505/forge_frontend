import { Challenge } from "./challenge/challenge";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { ChallengeParticipatedInterface } from "@/interfaces/interfaces";

const getParticipatedChallenges = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getParticipatedChallenges/`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!res.ok) {
        toast.message(
            "Couldn't get the data for participated challenges. Please try again later"
        );
        return;
    }

    const data = await res.json();
    return data || [];
};

export const Challenges = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["participatedChallenges"],
        queryFn: getParticipatedChallenges,
        retry: 1,
    });

    useEffect(() => {
        if (isError) {
            toast.message(
                "Couldn't get the data for participated challenges. Please try again later!"
            );
        }
    }, [isError]);

    if (isLoading) return <div>Loading ...</div>;

    return (
        <div className="px-32 pb-4 mt-12">
            <h2 className="text-3xl font-semibold">My challenges</h2>
            {data &&
                data.data &&
                data.data.map(
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
};
