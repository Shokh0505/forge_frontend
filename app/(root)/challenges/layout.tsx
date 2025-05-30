"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ChallengeLayout({ children }: { children: ReactNode }) {
    const [challengesQueryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={challengesQueryClient}>
            {children}
        </QueryClientProvider>
    );
}
