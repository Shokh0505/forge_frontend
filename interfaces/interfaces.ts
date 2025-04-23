export interface TopCreateChallengeProps {
    setChallengeTitle: React.Dispatch<React.SetStateAction<string>>;
    challengeTitle: string;
}

export interface ProfileProps {
    profile_photo?: string;
    username?: string;
}

export interface User {
    username: string;
    email: string;
    profile_photo?: string;
}

export interface PostInterface {
    challenge_photo?: string;
    challenge_title: string;
    created_at: string;
    description: string;
    finish_time: string;
    id: number;
    likes: number;
    owner: User;
    start_time: string;
    participants: User[];
}

export interface PaginatedPostsResponse {
    count: number;
    next: number | null;
    previous: number | null;
    results: PostInterface[];
    likedIDs: string[];
}

export interface LikedIDsInterface {
    likedIDs: Set<string>;
    setLikedIDs: (ids: string[]) => void;
    toggleLike: (id: string) => void;
    isLiked: (id: string) => boolean;
}

export interface ChallengeInfoInterface {
    isJoined: boolean;
    isFinshedToday: boolean;
    daysPassed: number;
    todayGroupCompletePercent: number;
    streakGroup: number;
    topLeaders: User[];
}

interface Challenge {
    challengeName: string;
    challengeDesc: string;
    challengeOwner: { username: string; profile_photo?: string };
}

export interface ChallengeInterface {
    challenge: Challenge;
    setSelectedChallenge: (challenge: Challenge) => void;
}
