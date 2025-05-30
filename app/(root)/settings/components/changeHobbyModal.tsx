"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useOpenChangeBio from "@/store/openChangeBio";
import changeBIO from "../_service/changeHobby";
import { useState } from "react";

export const ChangeHobbyModal = () => {
    const [textValue, setTextValue] = useState("");
    const { open, setOpen } = useOpenChangeBio();

    const handleSubmit = async () => {
        if (!textValue) return;
        const isSuccessfullyUpdated = await changeBIO(textValue);

        if (isSuccessfullyUpdated) setOpen(!open);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg_main text_main">
                    <DialogHeader>
                        <DialogTitle>
                            Write a brief bio for your account
                        </DialogTitle>
                        <DialogDescription>
                            This is where you can update your bio for your
                            account.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Textarea
                            name="hobby"
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            className="mt-4"
                        />
                    </div>
                    <div className="text-center">
                        <Button
                            className="w-1/2 green cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Save Change
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
