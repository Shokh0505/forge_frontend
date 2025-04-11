import { create } from "zustand";

interface AccessTokenState {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

const useAccessToken = create<AccessTokenState>((set) => ({
    accessToken: "",
    setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default useAccessToken;
