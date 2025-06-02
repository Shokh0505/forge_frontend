import { useEffect, useState } from "react";
import getStreakData from "../service/getStreakData";

type Streak = {
    date: string;
    percentage: number;
};

export const useStreakData = (id: string) => {
    const [streakData, setStreakData] = useState<Streak[]>([]);

    const fetchData = async () => {
        const data = await getStreakData(id);
        setStreakData(data);
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return { streakData, setStreakData, fetchData };
};
