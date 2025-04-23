import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const daysInMonth = 31;
const firstDayOffset = 3;
const streakData = Array.from({ length: daysInMonth }, () =>
    Math.floor(Math.random() * 10)
);

const getColor = (streak: number) => {
    if (streak === 0) return "bg-gray-200";
    if (streak < 3) return "bg-green-200";
    if (streak < 6) return "bg-green-400";
    if (streak < 10) return "bg-green-600";
    return "bg-green-800";
};

const StreakGrid = () => {
    return (
        <div>
            <div className="grid grid-cols-7 gap-1 px-8 flex-10/12 ">
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                    <div key={`offset-${i}`} className="w-5 h-5" />
                ))}

                {streakData.map((streak, index) => (
                    <div
                        key={index}
                        className={`w-5 h-5 rounded  cursor-pointer ${getColor(
                            streak
                        )}`}
                        title={`${streak} contributions`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StreakGrid;
