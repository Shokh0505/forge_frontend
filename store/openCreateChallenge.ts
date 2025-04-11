import { create } from "zustand";

interface useOpenCreateChallenge {
    isOpen: boolean;
    setIsOpen: (nav: boolean) => void;
}

const useOpenCreateChallenge = create<useOpenCreateChallenge>((set) => ({
    isOpen: false,
    setIsOpen: (shouldOpen: boolean) => set({ isOpen: shouldOpen }),
}));

export default useOpenCreateChallenge;
