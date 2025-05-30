"use client";

import { MenuItem } from "@/components/ui/menu_item";
import { usePathname, useRouter } from "next/navigation";

export const Leftbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "home";

    const handleClick = (name: string) => {
        if (name === "home") {
            router.push("/");
        } else if (name === "challenges") {
            router.push("/challenges");
        } else if (name === "inbox") {
            router.push("/inbox");
        } else if (name === "settings") {
            router.push("/settings");
        }
    };

    return (
        <div>
            <div onClick={() => handleClick("home")}>
                <MenuItem name="Home" icon="home" selected={last === "home"} />
            </div>
            <div onClick={() => handleClick("challenges")}>
                <MenuItem
                    name="Challenges"
                    icon="challenges"
                    selected={last === "challenges"}
                />
            </div>
            <div onClick={() => handleClick("inbox")}>
                <MenuItem
                    name="Inbox"
                    icon="inbox"
                    selected={last === "inbox"}
                />
            </div>
            <div onClick={() => handleClick("settings")}>
                <MenuItem
                    name="Settings"
                    icon="settings"
                    selected={last === "settings"}
                />
            </div>
        </div>
    );
};
