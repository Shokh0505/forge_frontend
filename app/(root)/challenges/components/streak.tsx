import React, { useMemo } from "react";

const daysInMonth = 31;
// const firstDayOffset = 3;

type Streak = {
    date: string;
    percentage: number;
};

type StreakGridGroup = {
    streakData: Streak[];
};

const getColor = (percentage: number) => {
    if (percentage === 0) return "bg-green-100";
    if (percentage < 20) return "bg-green-200";
    if (percentage < 60) return "bg-green-400";
    if (percentage < 100) return "bg-green-600";
    return "bg-green-800";
};

const StreakGrid = ({ streakData }: StreakGridGroup) => {
    const streakMap = useMemo(
        () =>
            streakData.reduce((acc, streak) => {
                acc[streak.date] = streak;
                return acc;
            }, {} as Record<string, Streak>),
        [streakData]
    );

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const allDays = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        return `${year.toString()}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
    });

    const oldestDate = useMemo(() => {
        return streakData
            .slice()
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            )[0];
    }, [streakData]);

    const offset = useMemo(() => {
        if (!oldestDate?.date) return 0;

        const date = new Date(oldestDate.date);
        const firstMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfWeek = firstMonth.getDay();

        return (dayOfWeek + 6) % 7;
    }, [oldestDate]);

    return (
        <div>
            <div className="grid grid-cols-7 gap-1 px-8 flex-10/12">
                {Array.from({ length: offset }).map((_, i) => (
                    <div key={`offset-${i}`} className="w-5 h-5" />
                ))}

                {allDays.map((day, index) => {
                    const streak = streakMap[day];

                    return (
                        <div
                            key={index}
                            className={`w-5 h-5 rounded cursor-pointer ${getColor(
                                streak ? streak.percentage : 0
                            )}`}
                            title={
                                streak
                                    ? `${
                                          (streak.date, streak.percentage)
                                      }% contributions`
                                    : "No contributions"
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StreakGrid;
