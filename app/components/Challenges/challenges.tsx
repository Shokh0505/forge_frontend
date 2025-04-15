import { Challenge } from "./challenge/challenge";

export const Challenges = () => {
    return (
        <div className="px-32 pb-4 mt-12">
            <h2 className="text-3xl font-semibold">My challenges</h2>
            <Challenge />
            <h2 className="text-3xl font-semibold mt-12">Group statistics</h2>
            <Challenge />
        </div>
    );
};
