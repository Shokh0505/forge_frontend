import React, { useMemo } from "react";
import { useStreakData } from "../hooks/streakData";

const daysInMonth = 31;
// const firstDayOffset = 3;

type Streak = {
    date: string;
    percentage: number;
};

const getColor = (percentage: number) => {
    if (percentage === 0) return "bg-green-100";
    if (percentage < 20) return "bg-green-200";
    if (percentage < 60) return "bg-green-400";
    if (percentage < 100) return "bg-green-600";
    return "bg-green-800";
};

const StreakGrid = ({ id }: { id: string }) => {
    const { streakData } = useStreakData(id);

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

    const offset = new Date(year, month - 1, 1).getDay();
    const isoOffset = (offset + 6) % 7;

    return (
        <div>
            <div className="grid grid-cols-7 gap-1 px-8 flex-10/12">
                {Array.from({ length: isoOffset }).map((_, i) => (
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
