"use client";
import { ChallengeParticipatedInterface } from "@/interfaces/interfaces";

import Profile from "@/components/ui/profile";
import StreakGrid from "./streak";

import { useRouter } from "next/navigation";
import allowedMessaging from "../service/allowedMessaging";

export const Challenge = ({
    data,
}: {
    data: ChallengeParticipatedInterface;
}) => {
    const { id, days, percentage, streak, owner, challengeTitle } = data;
    const router = useRouter();

    const handleGoChallenge = () => {
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}challenge/${id}`);
    };

    const handleNavigationChat = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        const isAllowedMessaging = await allowedMessaging(owner.id);
        console.log(isAllowedMessaging);
        if (!isAllowedMessaging) return;

        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}chat/${owner.id}`);
    };

    return (
        <div className="px-8 bg_secondary w-full  border rounded-xl py-8">
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
            <div className="mt-12 md:mt-16 flex items-center justify-between px-4">
                <div className="relative">
                    <div className="text-xl sm:text-3xl font-semibold">
                        {days} days
                    </div>
                    <div className="text_secondary">Finished</div>
                </div>
                <div className="w-1 h-12 bg-green-500"></div>
                <div>
                    <div className="text-xl sm:text-3xl font-semibold">
                        {percentage} %
                    </div>
                    <div className="text_secondary">completed (today)</div>
                </div>
                <div className="w-1 h-12 bg-green-500"></div>
                <div>
                    <div className="text-xl sm:text-3xl font-semibold">
                        {streak} days
                    </div>
                    <div className="text_secondary">streak</div>
                </div>
            </div>
            <div className="mt-12 md:mt-24">
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
                    <StreakGrid />
                </div>
            </div>
        </div>
    );
};
