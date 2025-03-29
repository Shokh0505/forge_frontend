import { Post } from "./Post/Post";
import { TopCreateChallenge } from "./TopCreateChallenge.tsx/TopCreateChallenge";

const post = {
    date: "17 - fevral, 2024",
    image: "/motivation.png",
    caption:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    likes: 0,
};

export const LandingPage = () => {
    return (
        <div className="px-32 pb-4">
            <TopCreateChallenge />
            <Post post={post} />
            <Post post={post} />
            <Post post={post} />
            <Post post={post} />
        </div>
    );
};
