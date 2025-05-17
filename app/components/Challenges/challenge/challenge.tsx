"use client";
import Profile from "@/app/components/ui/profile";
import StreakGrid from "../streak/streak";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserInterfaceWithID } from "@/interfaces/interfaces";

export const Challenge = ({
    data,
}: {
    data: {
        id: string;
        days: number;
        percentage?: number;
        streak: number;
        owner: UserInterfaceWithID;
        challengeTitle: string;
    };
}) => {
    const [streakData, setStreakData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        console.log(data.owner);
        const getStreakData = async () => {
            const payload = {
                challengeID: data.id,
                date: new Date().toISOString().split("T")[0],
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChallengeStreak/`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                toast.message("Couldn't get streak. Try again later");
            }

            const streakData = await res.json();

            setStreakData(streakData.data);
        };

        getStreakData();
    }, []);

    const handleGoChallenge = () => {
        router.push(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}challenge/${data.id}`
        );
    };

    const handleNavigationChat = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();

        router.push(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}chat/${data.owner.id}`
        );
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
                    <div className="text-md">{data.owner.username}</div>
                    <div className="text_secondary">{data.challengeTitle}</div>
                </div>
            </div>
            <div className="mt-16 flex items-center justify-between px-4">
                <div className="relative">
                    <div className="text-3xl font-semibold">
                        {data.days} days
                    </div>
                    <div className="text_secondary">Finished</div>
                </div>
                <div className="w-1 h-12 bg-green-500"></div>
                <div>
                    <div className="text-3xl font-semibold">
                        {data.percentage} %
                    </div>
                    <div className="text_secondary">completed (today)</div>
                </div>
                <div className="w-1 h-12 bg-green-500"></div>
                <div>
                    <div className="text-3xl font-semibold">
                        {data.streak} days
                    </div>
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
