import { useEffect } from "react";

interface imagePreviewInterace {
    challengePhoto: FileList | undefined;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useImagePreview({
    challengePhoto,
    setImage,
    setPreview,
}: imagePreviewInterace) {
    useEffect(() => {
        const fileList = challengePhoto as FileList | undefined;

        if (fileList?.[0] instanceof File) {
            const file = fileList[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }, [challengePhoto]);
}
