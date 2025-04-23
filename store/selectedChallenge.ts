import { create } from "zustand";
import { ChallengeInterface } from "@/interfaces/interfaces";

const useSelecteChallenge = create<ChallengeInterface>((set) => ({
    challenge: {
        challengeName: "",
        challengeDesc: "",
        challengeOwner: {
            username: "",
            profile_photo: "",
        },
    },
    setSelectedChallenge: (challenge) => set({ challenge }),
}));

export default useSelecteChallenge;
