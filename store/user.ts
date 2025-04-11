import { create } from "zustand";

interface UserInterface {
    username: string;
    email: string;
    profile_photo: string;
}

const useUser = create<
    UserInterface & { updateUser: (data: Partial<UserInterface>) => void }
>((set) => ({
    username: "",
    email: "",
    profile_photo: "",

    updateUser: (data) => set((state) => ({ ...state, ...data })),
}));

export default useUser;
