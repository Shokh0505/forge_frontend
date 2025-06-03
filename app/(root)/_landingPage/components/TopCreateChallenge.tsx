"use client";
import useOpenCreateChallenge from "@/store/openCreateChallenge";

import { useChallengeTitle } from "../hooks/useChallengeTitle";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TopCreateChallenge = () => {
    const { challengeTitle, setChallengeTitle } = useChallengeTitle();
    const { setIsOpen } = useOpenCreateChallenge();
    const openDialog = () => setIsOpen(true);

    return (
        <div className="bg_secondary w-full mt-12 flex items-center justify-between flex-col lg:flex-row py-4 px-2 lg:px-8 rounded-lg border mx-auto gap-2">
            <div className="w-full lg:flex-3/4 ">
                <Input
                    className="h-10 placeholder"
                    placeholder="Challenge name..."
                    value={challengeTitle}
                    onChange={(e) => {
                        setChallengeTitle(e.target.value);
                    }}
                />
            </div>
            <div className="lg:flex-1/4 w-full">
                <Button
                    className="w-full mt-4 lg:mt-0 p-4 lg:py-2 green text-[1.1rem] cursor-pointer"
                    onClick={openDialog}
                >
                    Create
                </Button>
            </div>
        </div>
    );
};
