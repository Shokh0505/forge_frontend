"use client";
import { TopCreateChallenge } from "./TopCreateChallenge";
import { CreateChallengeModal } from "./modal/createChallengeModal";
import { Toaster } from "@/components/ui/sonner";
import Posts from "@/app/(root)/_landingPage/components/Posts";

export const LandingPage = () => {
    return (
        <>
            <div className="px-4 lg:px-24 pb-4 overflow-y-auto">
                <TopCreateChallenge />
                <Posts />
                <CreateChallengeModal />
                <Toaster />
            </div>
        </>
    );
};
