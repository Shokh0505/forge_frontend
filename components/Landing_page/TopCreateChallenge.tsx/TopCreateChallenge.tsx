import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Profile from "@/components/ui/profile";
import React from "react";

export const TopCreateChallenge = () => {
    return (
        <div className="bg_secondary w-[45rem] mt-12 flex items-center justify-between py-4 px-8 rounded-lg border mx-auto">
            <Profile />
            <Input
                className="w-[30rem] placeholder"
                placeholder="Create a challenge..."
            />
            <Button className="px-4 py-2 green text-[1.1rem] cursor-pointer">
                Create
            </Button>
        </div>
    );
};
