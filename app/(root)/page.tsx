"use client";
import { LandingPage } from "@/app/(root)/_landingPage/components/Landing_Page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { useAuthOrRedirect } from "./_hooks/useAuthOrRedirect";

const queryClient = new QueryClient();

export default function Home() {
    useAuthOrRedirect();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <LandingPage />
            </QueryClientProvider>
            <Toaster />
        </>
    );
}
