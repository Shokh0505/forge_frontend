import Image from "next/image";
import Profile from "@/components/ui/profile";
import { FaHeart } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

interface PostProps {
    date: string;
    image: string;
    caption: string;
    likes: number;
}
export const Post = ({ post }: { post: PostProps }) => {
    const { date, image, caption, likes } = post;

    return (
        <div className="mt-8 w-[45rem] bg_secondary mx-auto border rounded-md">
            <div className="flex items-center flex-start px-8 py-6">
                <div>
                    <Profile />
                </div>
                <div className="ml-4">
                    <div className="font-semibold">Some person</div>
                    <div className="text_secondary">{date}</div>
                </div>
            </div>
            <div className="mt-2 relative w-[40rem] mx-auto h-[20rem] rounded-sm overflow-hidden px-8 py-4">
                <Image
                    src={image}
                    alt="Post image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm"
                />
            </div>
            <div className="mt-8 px-9 mb-4">{caption}</div>
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
