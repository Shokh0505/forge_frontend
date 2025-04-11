export interface TopCreateChallengeProps {
    setChallengeTitle: React.Dispatch<React.SetStateAction<string>>;
    challengeTitle: string;
}

export interface ProfileProps {
    profile_photo: string;
    username?: string;
}
