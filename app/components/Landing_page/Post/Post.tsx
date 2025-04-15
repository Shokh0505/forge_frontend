import Image from "next/image";
import Profile from "@/app/components/ui/profile";
import { FaHeart } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { PostInterface } from "@/interfaces/interfaces";
import formatDate from "@/lib/formatDate";

export const Post = ({ post }: { post: PostInterface }) => {
    const { challenge_photo, owner, created_at, description, likes } = post;

    return (
        <div className="mt-8 w-[45rem] bg_secondary mx-auto border rounded-md">
            <div className="flex items-center flex-start px-8 py-6">
                <div>
                    <Profile profile_photo={owner.profile_photo} />
                </div>
                <div className="ml-4">
                    <div className="font-semibold">Some person</div>
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
            <div className="mt-8 px-9 mb-4">{description}</div>
            <div className="mt-8 mb-6 flex items-center justify-end gap-4 px-8">
                <FaHeart className="w-7 h-7" />
                <div className="text-lg"> {likes} </div>
                <div>
                    <IoIosAddCircle className="w-8 h-8" />
                </div>
            </div>
        </div>
    );
};
