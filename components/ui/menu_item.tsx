"use client";

import clsx from "clsx";
import { FaAward, FaHome } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import styles from "./styles/style.module.css";
import useNavigation from "@/store/navigation";

export const MenuItem = ({
    name,
    icon,
    selected,
}: {
    name: string;
    icon: "home" | "challenges" | "inbox" | "settings";
    selected?: boolean;
}) => {
    const lowerCaseName = name.toLowerCase();
    const { setNavigation } = useNavigation();

    return (
        <div
            className={clsx(
                "px-2 py-4 rounded-[4px] relative cursor-pointer mb-4 hover:",
                `${styles.bg_hover}`,
                selected ? "bg_third" : "bg_secondary"
            )}
            onClick={() => setNavigation(lowerCaseName)}
        >
            <div className="flex items-center">
                {icon === "home" && <FaHome className="text-2xl mx-4" />}
                {icon === "challenges" && <FaAward className="text-2xl mx-4" />}
                {icon === "inbox" && (
                    <FiMessageSquare className="text-2xl mx-4" />
                )}
                {icon === "settings" && (
                    <IoSettingsSharp className="text-2xl mx-4" />
                )}

                <div className="font-semibold text-xl">{name}</div>
            </div>

            {selected && (
                <div className="w-3 h-full absolute right-0 top-0 green rounded-tr-sm rounded-br-sm"></div>
            )}
        </div>
    );
};
