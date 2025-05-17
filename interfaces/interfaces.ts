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

export interface UserInterfaceWithID {
    id: string;
    username: string;
    profile_photo?: string;
}

export interface ChallengeInfoInterface {
    owner: UserInterfaceWithID;
    challengeTitle: string;
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

export interface ChallengeParticipatedInterface {
    id: string;
    days: number;
    percentage: number;
    streak: number;
    owner: string;
    challengeTitle: string;
}

export interface MessageDataAPI {
    sender: { id: number | string; username: string };
    message: string;
    sent_at: string;
}

export interface MessagesInterface {
    person: "user" | "partner";
    message: string;
    sentAt: string;
}
