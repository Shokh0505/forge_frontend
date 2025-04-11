"use client";
import { Challenges } from "@/components/Challenges/challenges";
import { Inbox } from "@/components/inbox/inbox";
import { LandingPage } from "@/components/Landing_page/Landing_Page";
import { Settings } from "@/components/settings/settings";
import useNavigation from "@/store/navigation";
import useUser from "@/store/user";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Home() {
    const { navigation } = useNavigation();
    const { updateUser } = useUser();

    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("api/whichUser/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const res = await response.json();

                if (!response.ok) {
                    toast.error(
                        `There is error fetching data: ${
                            res.error ? res.error : "Something went wrong(001)"
                        }`
                    );
                    router.push("/login");
                    return;
                }

                updateUser({
                    username: res.user,
                    email: res.email,
                    profile_photo: res.profile_photo,
                });
            } catch {
                toast.error(
                    `There is error fetching data: Internal Server Error(500)`
                );
                router.push("/login");
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            {navigation === "home" && <LandingPage />}
            {navigation === "my challenges" && <Challenges />}
            {navigation === "inbox" && <Inbox />}
            {navigation === "settings" && <Settings />}
            <Toaster />
        </>
    );
}
