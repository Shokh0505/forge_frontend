import { create } from "zustand";
import { LikedIDsInterface } from "@/interfaces/interfaces";

const useLikedIDs = create<LikedIDsInterface>((set, get) => ({
    likedIDs: new Set(),

    setLikedIDs: (ids) => {
        const current = get().likedIDs;
        const updated = new Set(current);
        ids.forEach((id) => updated.add(id));
        set({ likedIDs: updated });
    },

    toggleLike: (id) => {
        const current = new Set(get().likedIDs);
        if (current.has(id)) {
            current.delete(id);
        } else {
            current.add(id);
        }
        set({ likedIDs: current });
    },

    isLiked: (id) => get().likedIDs.has(id),
}));

export default useLikedIDs;
