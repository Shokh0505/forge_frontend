"use client";
import getStreakData from "../service/getStreakData";
import { ChallengeParticipatedInterface } from "@/interfaces/interfaces";

import Profile from "@/components/ui/profile";
import StreakGrid from "./streak";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Challenge = ({
    data,
}: {
    data: ChallengeParticipatedInterface;
}) => {
    const [streakData, setStreakData] = useState([]);
    const { id, days, percentage, streak, owner, challengeTitle } = data;
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStreakData(id);
            if (data.length !== 0) {
                setStreakData(data);
            }
            console.log(data);
        };
        fetchData();
    }, []);

    const handleGoChallenge = () => {
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}challenge/${id}`);
    };

    const handleNavigationChat = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();

        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}chat/${owner.id}`);
    };

    return (
        <div className="px-8 bg_secondary w-[45rem] border rounded-xl py-8">
            <div
                className="flex items-center justify-start cursor-pointer"
                onClick={handleGoChallenge}
            >
                <div onClick={handleNavigationChat}>
                    <Profile />
                </div>
                <div className="ml-4">
                    <div className="font-medium">{owner?.username}</div>
                    <div className="text_secondary">{challengeTitle}</div>
                </div>
            </div>
            <div className="mt-16 flex items-center justify-between px-4">
                <div className="relative">
                    <div className="text-3xl font-semibold">{days} days</div>
                    <div className="text_secondary">Finished</div>
                </div>
                <div className="w-1 h-12 bg-green-500"></div>
                <div>
                    <div className="text-3xl font-semibold">{percentage} %</div>
                    <div className="text_secondary">completed (today)</div>
                </div>
                <div className="w-1 h-12 bg-green-500"></div>
                <div>
                    <div className="text-3xl font-semibold">{streak} days</div>
                    <div className="text_secondary">streak</div>
                </div>
            </div>
            <div className="mt-24">
                <div>
                    <div className="grid grid-cols-7 gap-1 px-8 mb-4">
                        <div>Mon</div>
                        <div>Tues</div>
                        <div>Wed</div>
                        <div>Thur</div>
                        <div>Fri</div>
                        <div>Sat</div>
                        <div>Sun</div>
                    </div>
                    <StreakGrid streakData={streakData} />
                </div>
            </div>
        </div>
    );
};
