import { create } from "zustand";

type ModalState = {
    open: boolean;
    setOpen: (val: boolean) => void;
    toggle: () => void;
};

const useModalProfilePicture = create<ModalState>((set) => ({
    open: false,
    setOpen: (val) => set({ open: val }),
    toggle: () => set((state) => ({ open: !state.open })),
}));

export default useModalProfilePicture;
