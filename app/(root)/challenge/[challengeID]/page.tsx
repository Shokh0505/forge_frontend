"use client";
import { Challenge } from "@/app/components/Challenges/challenge/challenge";
import { PersonChat } from "@/app/components/inbox/person_chat/person_chat";
import { Button } from "@/app/components/ui/button";
import { ChallengeInfoInterface } from "@/interfaces/interfaces";
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
    });

    const handleJoinChallenge = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/joinChallenge/`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            );

            if (!res.ok) {
                toast.message("Couldn't join the challenge");
                return;
            }

            toast.message("Joined the challenge. Now No going back");
        } catch {
            toast.message(
                "Coudln't add to the challenge. Please try again later"
            );
        }
    };

    const handleDoneChallenge = async () => {
        try {
            const data = await fetch(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/finishedChallengeToday/`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            );

            if (!data.ok) {
                toast.message("Couldn't mark done, please try again later");
                return;
            }

            toast.message("Well done!");
            return;
        } catch {
            toast.message("Internal server error. Please try again later!");
            return;
        }
    };

    const handleLeaveChallenge = async () => {
        try {
            const data = await fetch(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/leaveChallenge/`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            );

            if (!data.ok) {
                toast.message("Couldn't mark done, please try again later");
                return;
            }

            toast.message("You should not give up. Rest then come back dude!");
        } catch {
            toast.message("Internal server error. Please try again later!");
        }
    };

    useEffect(() => {
        const getChalengeInfo = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChallengeInfo/`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            );

            if (!res.ok) {
                toast.message("Couldn't get challenge info");
                return;
            }

            const resData = await res.json();
            console.log(resData);
            setApiData({
                isJoined: resData.data.isJoined,
                isFinshedToday: resData.data.isFinishedToday,
                daysPassed: resData.data.daysPassed,
                todayGroupCompletePercent:
                    resData.data.todayGroupCompletePercent,
                streakGroup: resData.data.streakGroup,
                topLeaders: resData.data.topLeaders,
            });
        };

        getChalengeInfo();
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
                <Challenge
                    id={id}
                    days={apiData.daysPassed}
                    percentage={apiData.todayGroupCompletePercent}
                    streak={apiData.streakGroup}
                />
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
        </>
    );
}
