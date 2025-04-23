"use client";
import Profile from "@/app/components/ui/profile";
import StreakGrid from "../streak/streak";
import useSelecteChallenge from "@/store/selectedChallenge";

export const Challenge = ({
    days,
    percentage,
    streak,
}: {
    id: string;
    days: number;
    percentage: number;
    streak: number;
}) => {
    const { challenge } = useSelecteChallenge();

    return (
        <div className="px-8 bg_secondary w-[45rem] border rounded-xl mt-8 py-8">
            <div className="flex items-center justify-start">
                <div>
                    <Profile />
                </div>
                <div className="ml-4">
                    <div className="text-md">
                        {challenge.challengeOwner.username}
                    </div>
                    <div className="text_secondary">
                        {challenge.challengeName}
                    </div>
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
                    <div className="text_secondary">completed</div>
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
                    <StreakGrid />
                </div>
            </div>
        </div>
    );
};
