import { create } from "zustand";

interface Navigation {
    navigation: string;
    setNavigation: (nav: string) => void;
}

const useNavigation = create<Navigation>((set) => ({
    navigation: "home",
    setNavigation: (nav: string) => set({ navigation: nav }),
}));

export default useNavigation;
