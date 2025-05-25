import Profile from "@/components/ui/profile";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import useUser from "@/store/user";

export const Settings = () => {
    const { username } = useUser();
    return (
        <div className="px-32 pb-4 mt-12 overflow-auto">
            <div className="w-full bg_secondary pt-[8rem] rounded-xl pb-10">
                <div className="relative w-full">
                    <div className="h-24 w-24 ml-10 z-10 mt-[-12] relative">
                        <Profile />
                    </div>
                    <hr className="green w-full z-0 relative translate-y-[-2.5rem]" />{" "}
                </div>
                <div className="mt-6 px-10">
                    <div className="text-3xl font-bold">{username}</div>
                    <div className="mt-4 text_secondary">
                        Nimagadir qiziqadi hobbisini bilmayman futbol
                        o&apos;ynashni yaxshi biladi
                    </div>
                </div>
                <hr className="mt-8" />
                <div className="mt-12 px-10">
                    <h3 className="text-3xl font-bold">Settings</h3>
                    <div className="flex justify-between items-center mt-10">
                        <div>Allow users to send me messages</div>
                        <div>
                            <Switch />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div>Whitelist username who can text me</div>
                        <div>
                            <Input
                                type="text"
                                name="whitelist_username"
                                placeholder="Enter the username..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
