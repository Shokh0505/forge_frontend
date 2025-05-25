"use client";
import Profile from "@/components/ui/profile";
import useOpenCreateChallenge from "@/store/openCreateChallenge";

import { useChallengeTitle } from "../hooks/useChallengeTitle";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TopCreateChallenge = () => {
    const { challengeTitle, setChallengeTitle } = useChallengeTitle();
    const { setIsOpen } = useOpenCreateChallenge();
    const openDialog = () => setIsOpen(true);

    return (
        <div className="bg_secondary w-[45rem] mt-12 flex items-center justify-between py-4 px-8 rounded-lg border mx-auto">
            <Profile />
            <Input
                className="w-[30rem] placeholder"
                placeholder="Create a challenge..."
                value={challengeTitle}
                onChange={(e) => {
                    setChallengeTitle(e.target.value);
                }}
            />
            <Button
                className="px-4 py-2 green text-[1.1rem] cursor-pointer"
                onClick={openDialog}
            >
                Create
            </Button>
        </div>
    );
};
