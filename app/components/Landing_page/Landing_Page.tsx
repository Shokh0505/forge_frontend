"use client";
import { useState } from "react";
import { TopCreateChallenge } from "./TopCreateChallenge.tsx/TopCreateChallenge";
import { CreateChallengeModal } from "../modals/createChallengeModal";
import Posts from "@/app/(root)/serverComponents/Posts/Posts";

export const LandingPage = () => {
    const [challengeTitle, setChallengeTitle] = useState("");

    return (
        <>
            <div className="px-32 pb-4 overflow-y-auto">
                <TopCreateChallenge
                    setChallengeTitle={setChallengeTitle}
                    challengeTitle={challengeTitle}
                />
                <Posts />
                <CreateChallengeModal
                    challengeTitle={challengeTitle}
                    setChallengeTitle={setChallengeTitle}
                />
            </div>
        </>
    );
};
