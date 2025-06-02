import { create } from "zustand";

interface UserInterface {
    username: string;
    email: string;
    profile_photo: string;
    bio?: string;
}

const useUser = create<
    UserInterface & { updateUser: (data: Partial<UserInterface>) => void }
>((set) => ({
    username: "",
    email: "",
    profile_photo: "",
    bio: "",

    updateUser: (data) => set((state) => ({ ...state, ...data })),
}));

export default useUser;
