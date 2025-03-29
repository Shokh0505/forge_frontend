"use client";

import { Challenges } from "@/components/Challenges/challenges";
import { LandingPage } from "@/components/Landing_page/Landing_Page";
import useNavigation from "@/store/navigation";

export default function Home() {
    const { navigation } = useNavigation();

    return (
        <>
            {navigation === "home" && <LandingPage />}
            {navigation === "my challenges" && <Challenges />}
        </>
    );
}
