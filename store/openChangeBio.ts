import { create } from "zustand";

type ModalType = {
    open: boolean;
    setOpen: (val: boolean) => void;
    toggle: () => void;
};

const useOpenChangeBio = create<ModalType>((set) => ({
    open: false,
    setOpen: (val) => set({ open: val }),
    toggle: () => set((state) => ({ open: !state.open })),
}));

export default useOpenChangeBio;
