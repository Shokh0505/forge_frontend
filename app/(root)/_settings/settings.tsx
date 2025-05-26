import Profile from "@/components/ui/profile";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import useUser from "@/store/user";
import { ChooseProfilePicModal } from "./components/chooseProfilePicModal";
import useModalProfilePicture from "@/store/openChooseProfilePicuture";
import { FaPen } from "react-icons/fa";
import useOpenChangeBio from "@/store/openChangeBio";
import { ChangeHobbyModal } from "./components/changeHobbyModal";
import { useEffect, useState } from "react";
import toggleAllowMessagesAsync from "./_service/allowMessages";
import addWhiteList from "./_service/addWhiteList";
import getWhiteListedPeople from "./_service/getWhiteListedPeople";

export const Settings = () => {
    const { username, profile_photo } = useUser();
    const { toggle } = useModalProfilePicture();
    const { open, setOpen } = useOpenChangeBio();
    const [allowMessages, setAllowMessages] = useState(true);
    const [whiteListUsername, setWhiteListUsername] = useState("");

    useEffect(() => {
        const changeAllowMessages = async () => {
            await toggleAllowMessagesAsync();
        };

        changeAllowMessages();
    }, [allowMessages]);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && whiteListUsername.trim()) {
            await addWhiteList(whiteListUsername);
        }
    };

    useEffect(() => {
        getWhiteListedPeople();
    }, []);

    return (
        <div className="px-32 pb-4 mt-12 overflow-auto">
            <div className="w-full bg_secondary pt-[8rem] rounded-xl pb-10">
                <div className="relative w-full">
                    <div
                        className="h-24 w-24 ml-10 z-10  relative cursor-pointer"
                        onClick={toggle}
                    >
                        <Profile profile_photo={profile_photo} />
                    </div>
                    <hr className="green w-full z-0 relative translate-y-[-2.5rem]" />{" "}
                </div>
                <div className="mt-6 px-10">
                    <div className="text-3xl font-bold">{username}</div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="text_secondary">
                            Nimagadir qiziqadi hobbisini bilmayman futbol
                            o&apos;ynashni yaxshi biladi
                        </div>
                        <div>
                            <FaPen
                                className="cursor-pointer hover:text-gray-400"
                                onClick={() => setOpen(!open)}
                            />
                        </div>
                    </div>
                </div>
                <hr className="mt-8" />
                <div className="mt-12 px-10">
                    <h3 className="text-3xl font-bold">Settings</h3>
                    <div className="flex justify-between items-center mt-10">
                        <div>Allow users to send me messages</div>
                        <div>
                            <Switch
                                checked={allowMessages}
                                onCheckedChange={setAllowMessages}
                            />
                        </div>
                    </div>
                    {!allowMessages && (
                        <div className="mt-4 flex justify-between items-center">
                            <div>Whitelist username who can text me</div>
                            <div className="text-end">
                                <Input
                                    type="text"
                                    name="whitelist_username"
                                    placeholder="Enter the username..."
                                    value={whiteListUsername}
                                    onChange={(e) =>
                                        setWhiteListUsername(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                    )}
                    <ChooseProfilePicModal />
                    <ChangeHobbyModal />
                </div>
            </div>
        </div>
    );
};
