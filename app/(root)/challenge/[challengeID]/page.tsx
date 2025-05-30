"use client";
import joinChallenge from "./_service/handleJoinChallenge";
import finishToday from "./_service/finishToday";
import leaveChallenge from "./_service/leaveChallenge";
import getChallengeInfo from "./_service/getChallengeInfo";
import { ChallengeInfoInterface } from "@/interfaces/interfaces";

import { Challenge } from "@/app/(root)/challenges/components/challenge";
import { PersonChat } from "@/app/(root)/inbox/components/person_chat";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChallengeShow() {
    const params = useParams();
    const rawID = params.challengeID;
    const id = Array.isArray(rawID) ? rawID[0] : rawID ?? ("" as string);

    const [apiData, setApiData] = useState<ChallengeInfoInterface>({
        isJoined: false,
        isFinshedToday: false,
        daysPassed: 0,
        todayGroupCompletePercent: 0,
        streakGroup: 0,
        topLeaders: [],
        challengeTitle: "",
        owner: { id: "", username: "" },
    });

    const handleJoinChallenge = async () => {
        const hasSuccessfullyJoined = await joinChallenge(id);

        if (hasSuccessfullyJoined) {
            setApiData({ ...apiData, isJoined: true });
            toast.message("Joined the challenge. Now No going back");
        } else {
            toast.message(
                "Coudln't add to the challenge. Please try again later"
            );
        }
    };

    const handleDoneChallenge = async () => {
        const hasFinishedSuccessfully = await finishToday(id);

        if (hasFinishedSuccessfully) {
            toast.message("Well done!");
            setApiData({ ...apiData, isFinshedToday: true });
        } else {
            toast.message(
                "Oops, something went wrong. Please try again later!"
            );
        }
    };

    const handleLeaveChallenge = async () => {
        const hasLeftSuccessfully = await leaveChallenge(id);

        if (hasLeftSuccessfully) {
            setApiData({ ...apiData, isJoined: false });
            toast.message("You should not give up. Rest then come back dude!");
        } else {
            toast.message(
                "Ooops, something went wrong. Please try again later"
            );
        }
    };

    useEffect(() => {
        async function load() {
            const data = await getChallengeInfo(id);
            if (data) setApiData(data);
        }

        load();
    }, []);

    return (
        <>
            <div className="px-32 pb-4 mt-12 overflow-y-auto">
                {apiData.isJoined ? (
                    !apiData.isFinshedToday && (
                        <div className="py-4 flex items-center justify-between bg_secondary px-8 rounded w-[45rem]">
                            <div>Did you finish the challenge today?</div>
                            <div>
                                <Button
                                    className="green py-2 px-4 h-auto text-[1.1rem] cursor-pointer"
                                    onClick={handleDoneChallenge}
                                >
                                    Done
                                </Button>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="py-4 flex items-center justify-between bg_secondary px-8 rounded w-[45rem]">
                        <div>Want to join the challenge?</div>
                        <div>
                            <Button
                                className="green py-2 px-4 h-auto cursor-pointer"
                                onClick={handleJoinChallenge}
                            >
                                Join the challenge
                            </Button>
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <Challenge
                        data={{
                            id: id,
                            days: apiData.daysPassed,
                            percentage: apiData.todayGroupCompletePercent,
                            streak: apiData.streakGroup,
                            owner: apiData.owner,
                            challengeTitle: apiData.challengeTitle,
                        }}
                    />
                </div>
                {apiData.topLeaders?.length !== 0 && (
                    <div className="mt-4 bg_secondary w-[45rem] rounded px-8 py-4">
                        <h3 className="text-xl font-bold">Top leaders</h3>
                        {apiData.topLeaders.map((person, idx) => (
                            <div key={idx}>
                                <PersonChat
                                    username={person.username}
                                    profile_photo={person.profile_photo}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="px-32">
                {apiData.isJoined && (
                    <div className="py-4 flex items-center justify-between bg_secondary px-8 rounded w-[45rem]">
                        <div>Do you want to leave the challenge?</div>
                        <div>
                            <Button
                                className="bg-red-600 hover:bg-red-800 py-2 px-4 h-auto text-[1.1rem] cursor-pointer"
                                onClick={handleLeaveChallenge}
                            >
                                Leave challenge
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Toaster />
        </>
    );
}
