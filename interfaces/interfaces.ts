export interface TopCreateChallengeProps {
    setChallengeTitle: React.Dispatch<React.SetStateAction<string>>;
    challengeTitle: string;
}

export interface ProfileProps {
    profile_photo?: string;
    username?: string;
}

export interface PostInterface {
    challenge_photo?: string;
    challenge_title: string;
    created_at: string;
    description: string;
    finish_time: string;
    id: number;
    likes: number;
    owner: { username: string; email: string; profile_photo?: string };
    start_time: string;
}
