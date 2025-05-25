"use client";
import { Challenges } from "@/app/(root)/_challenges/components/challenges";
import { Inbox } from "@/app/(root)/_inbox/inbox";
import { LandingPage } from "@/app/(root)/_landingPage/components/Landing_Page";
import { Settings } from "./_settings/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useNavigation from "@/store/navigation";
import { Toaster } from "@/components/ui/sonner";
import { useAuthOrRedirect } from "./_hooks/useAuthOrRedirect";

const queryClient = new QueryClient();

export default function Home() {
    const { navigation } = useNavigation();
    useAuthOrRedirect();

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
