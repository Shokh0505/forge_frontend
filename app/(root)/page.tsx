"use client";
import { Challenges } from "@/app/components/Challenges/challenges";
import { Inbox } from "@/app/components/inbox/inbox";
import { LandingPage } from "@/app/components/Landing_page/Landing_Page";
import { Settings } from "@/app/components/settings/settings";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import fetchUser from "@/lib/fetchUser";
import useNavigation from "@/store/navigation";
import { useEffect } from "react";
import { Toaster } from "../components/ui/sonner";

const queryClient = new QueryClient();

export default function Home() {
    const { navigation } = useNavigation();
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const isUserFetchedSuccessfully = await fetchUser();
            if (!isUserFetchedSuccessfully) {
                router.push("/login");
            }
        };
        checkUser();
    }, []);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {navigation === "home" && <LandingPage />}
                {navigation === "my challenges" && <Challenges />}
                {navigation === "inbox" && <Inbox />}
                {navigation === "settings" && <Settings />}
            </QueryClientProvider>
            <Toaster />
        </>
    );
}
