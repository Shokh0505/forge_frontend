"use client";

import { MenuItem } from "@/components/ui/menu_item";
import useNavigation from "@/store/navigation";

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
