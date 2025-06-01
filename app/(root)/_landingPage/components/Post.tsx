"use client";
import formatDate from "@/lib/formatDate";
import useLikedIDs from "@/store/likedIDs";
import { likeChallenge } from "../service/likeChallenge";
import { PostInterface } from "@/interfaces/interfaces";

import Image from "next/image";
import Profile from "@/components/ui/profile";
import { useRouter } from "next/navigation";

import { FaHeart } from "react-icons/fa";

export const Post = ({ post }: { post: PostInterface }) => {
    const {
        id,
        challenge_photo,
        owner,
        created_at,
        description,
        challenge_title,
    } = post;
    const { isLiked } = useLikedIDs();
    const isUserLiked = isLiked(String(id));
    const router = useRouter();

    const handleGoChallenge = () => {
        const apiUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
        router.push(`${apiUrl}challenge/${id}`);
    };

    return (
        <div className="mt-8 w-[45rem] bg_secondary mx-auto border rounded-md">
            <div
                className="flex items-center flex-start px-8 py-6 cursor-pointer"
                onClick={handleGoChallenge}
            >
                <div>
                    <Profile profile_photo={owner.profile_photo} />
                </div>
                <div className="ml-4">
                    <div className="font-semibold"> {owner.username} </div>
                    <div className="text_secondary">
                        {formatDate(created_at)}
                    </div>
                </div>
            </div>
            {challenge_photo && (
                <div className="mt-2 relative w-[40rem] mx-auto h-[20rem] rounded-sm overflow-hidden px-8 py-4">
                    <Image
                        src={`http://127.0.0.1:8000${challenge_photo}`}
                        alt="Post image"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                        className="rounded-sm"
                    />
                </div>
            )}
            <div className="mt-8 px-9 text-xl">{challenge_title}</div>
            <div className="mt-4 px-9 mb-4">{description}</div>
            <div className="mt-8 mb-6 flex items-center justify-end gap-4 px-8">
                <FaHeart
                    className={`w-7 h-7 hover:text-red-500 cursor-pointer ${
                        isUserLiked ? "text-red-600" : ""
                    }`}
                    onClick={() => likeChallenge({ isUserLiked, id })}
                />
            </div>
        </div>
    );
};
