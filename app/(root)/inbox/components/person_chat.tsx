import Profile from "@/components/ui/profile";

export const PersonChat = ({
    username,
    profile_photo,
    last_message,
}: {
    username: string;
    profile_photo?: string;
    last_message?: string;
}) => {
    return (
        <div className="my-4 cursor-pointer w-full bg_third flex items-center justify-start p-4 rounded-xl">
            <div className="w-14 h-14">
                <Profile profile_photo={profile_photo} />
            </div>
            <div className="flex justify-start items-start flex-col ml-4">
                <div className="font-semibold">{username}</div>
                <div className="text_secondary w-full truncate">
                    {last_message}
                </div>
            </div>
        </div>
    );
};
