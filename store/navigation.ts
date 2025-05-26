import { create } from "zustand";

interface Navigation {
    navigation: string;
    setNavigation: (nav: string) => void;
}

const useNavigation = create<Navigation>((set) => ({
    navigation: "settings",
    setNavigation: (nav: string) => set({ navigation: nav }),
}));

export default useNavigation;
