"use client";
import Link from "next/link";
import Profile from "@/components/ui/profile";
import useUser from "@/store/user";

export const Navbar = () => {
    const { profile_photo } = useUser();

    return (
        <div className="bg_main text_main flex items-center justify-between py-8">
            <div className="text-4xl font-semibold">
                <Link href={"/"}>Forge</Link>
            </div>
            <div className="mr-4">
                <Link href={"/settings"}>
                    <Profile profile_photo={profile_photo} />
                </Link>
            </div>
        </div>
    );
};
