import { useState } from "react";

export function useChallengeTitle(initial = "") {
    const [challengeTitle, setChallengeTitle] = useState(initial);
    return { challengeTitle, setChallengeTitle };
}
