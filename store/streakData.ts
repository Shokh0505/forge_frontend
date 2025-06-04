import getStreakData from "@/app/(root)/challenges/service/getStreakData";
import { create } from "zustand";

type Streak = { date: string; percentage: number };

interface StreakInterface {
    streakData: Streak[];
    fetchData: (id: string) => Promise<void>;
}

export const useStreakStore = create<StreakInterface>((set) => ({
    streakData: [],
    fetchData: async (id: string) => {
        const data = await getStreakData(id);
        set({ streakData: data });
    },
}));
