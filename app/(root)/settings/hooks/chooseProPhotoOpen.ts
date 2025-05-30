import { useState } from "react";

export default function useChooseProfilePictureOpen() {
    const [open, setOpen] = useState(true);

    return { open, setOpen };
}
