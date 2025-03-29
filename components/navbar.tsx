"use client";
import Link from "next/link";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import Profile from "./ui/profile";

export const Navbar = () => {
    return (
        <div className="bg_main text_main flex items-center justify-between py-8">
            <div className="text-4xl font-semibold">
                <Link href={"/"}>Forge</Link>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <CiSearch className="text-2xl translate translate-x-10" />
                    <Input
                        placeholder="Search friends, challenges..."
                        className="px-4 py-3 pl-12 min-w-xl rounded-[20px] placeholder:text-[#a1a1a1] h-auto"
                    />
                </div>
            </div>
            <Profile />
        </div>
    );
};
