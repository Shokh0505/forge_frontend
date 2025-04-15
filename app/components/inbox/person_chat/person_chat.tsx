import Profile from "@/app/components/ui/profile";

export const PersonChat = () => {
    return (
        <div className="my-4 cursor-pointer w-full bg_third flex items-center justify-start p-4 rounded-xl">
            <div className="w-14 h-14">
                <Profile />
            </div>
            <div className="flex justify-start items-start flex-col ml-4">
                <div className="font-semibold">Username</div>
                <div className="text_secondary">
                    Ehhh yaxshi bo&apos;lib ketar
                </div>
            </div>
        </div>
    );
};
