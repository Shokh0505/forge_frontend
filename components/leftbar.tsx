"use client";

import useNavigation from "@/store/navigation";
import { MenuItem } from "./ui/menu_item";

export const Leftbar = () => {
    const { navigation } = useNavigation();

    return (
        <div>
            <MenuItem name="Home" selected={navigation} icon="home" />
            <MenuItem
                name="My Challenges"
                selected={navigation}
                icon="challenges"
            />
            <MenuItem name="Inbox" selected={navigation} icon="inbox" />
            <MenuItem name="Settings" selected={navigation} icon="settings" />
        </div>
    );
};
