import useLikedIDs from "@/store/likedIDs";
import { toast } from "sonner";

interface likeChallangeInterface {
    isUserLiked: boolean;
    id: number;
}

export async function likeChallenge({
    isUserLiked,
    id,
}: likeChallangeInterface) {
    const { toggleLike } = useLikedIDs.getState();

    const response = await fetch("api/likeChallenge/", {
        method: isUserLiked ? "DELETE" : "POST",
        body: JSON.stringify({ id: id }),
        credentials: "include",
    });

    if (!response.ok) {
        toast.message(
            "Experiencing issue with like challenge. Please try again later!"
        );
        return;
    }

    toggleLike(String(id));
}
