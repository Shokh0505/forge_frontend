"use client";
import { useState } from "react";
import { Post } from "./Post/Post";
import { TopCreateChallenge } from "./TopCreateChallenge.tsx/TopCreateChallenge";
import { CreateChallengeModal } from "../modals/createChallengeModal";

const post = {
    date: "17 - fevral, 2024",
    image: "/motivation.png",
    caption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    likes: 0,
};

export const LandingPage = () => {
    const [challengeTitle, setChallengeTitle] = useState("");

    return (
        <div className="px-32 pb-4 overflow-y-auto">
            <TopCreateChallenge
                setChallengeTitle={setChallengeTitle}
                challengeTitle={challengeTitle}
            />
            <Post post={post} />
            <Post post={post} />
            <Post post={post} />
            <Post post={post} />
            <CreateChallengeModal
                challengeTitle={challengeTitle}
                setChallengeTitle={setChallengeTitle}
            />
        </div>
    );
};
