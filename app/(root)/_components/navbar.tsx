"use client";
import Link from "next/link";
import Profile from "@/components/ui/profile";
import useUser from "@/store/user";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import { Leftbar } from "./leftbar";

export const Navbar = () => {
    const { profile_photo } = useUser();

    return (
        <div className="bg_main text_main flex items-center justify-between py-8">
            <div className="text-4xl font-semibold">
                <Link href={"/"}>Forge</Link>
            </div>
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <RxHamburgerMenu className="text-3xl cursor-pointer" />
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="bg_main pt-8 text-white px-4"
                        aria-describedby={undefined}
                    >
                        <SheetHeader>
                            <SheetTitle className="text-white text-2xl">
                                Navigation
                            </SheetTitle>
                        </SheetHeader>
                        <Leftbar />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="mr-4 hidden lg:block">
                <Link href={"/settings"}>
                    <Profile profile_photo={profile_photo} />
                </Link>
            </div>
        </div>
    );
};
