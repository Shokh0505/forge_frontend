import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import useModalProfilePicture from "@/store/openChooseProfilePicuture";
import changeProfilePhoto from "../_service/changeProfilePhoto";
import { toast } from "sonner";
import useUser from "@/store/user";

export const ChooseProfilePicModal = () => {
    const { open, setOpen } = useModalProfilePicture();
    const { updateUser } = useUser();

    const handleClick = async (profile_pic: number) => {
        try {
            await changeProfilePhoto(profile_pic);
            updateUser({ profile_photo: `profile${profile_pic}.jpg` });
            setOpen(false);
        } catch (error) {
            const err = error as Error;
            toast.error(`${err.message}`);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg_main text_main">
                    <DialogHeader>
                        <DialogTitle>
                            Choose the profile picture you want to set.
                        </DialogTitle>
                        <DialogDescription>
                            This is where you can update your profile picture.
                            Choose among this picutres
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 grid grid-cols-3 grid-rows-3">
                        {Array.from({ length: 9 }, (_, i) => (
                            <div key={i}>
                                <div
                                    className="rounded-full overflow-hidden w-32 h-32 flex items-center justify-center my-4 cursor-pointer"
                                    onClick={() => handleClick(i + 1)}
                                >
                                    <Image
                                        src={`/profile${i + 1}.jpg`}
                                        width={50}
                                        height={50}
                                        alt={`profile picture ${i + 1}`}
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
