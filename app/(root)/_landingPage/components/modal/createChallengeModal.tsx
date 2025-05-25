"use client";
import { createFormDataChallenge } from "@/lib/createFormDataChallenge";
import { handleCreateChallengeSubmit } from "../../service/handleCreateChallenge";
import { useChallengeTitle } from "@/app/(root)/_landingPage/hooks/useChallengeTitle";
import { useImagePreview } from "./hooks/imagePreview";

import useOpenCreateChallenge from "@/store/openCreateChallenge";
import { SubmitChallengeInterface } from "@/interfaces/interfaces";
import { createChallengeSchema } from "@/schemas/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

export const CreateChallengeModal = () => {
    const { isOpen, setIsOpen } = useOpenCreateChallenge();
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { challengeTitle, setChallengeTitle } = useChallengeTitle();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createChallengeSchema),
        defaultValues: {
            challengeName: challengeTitle,
        },
    });

    const challengePhoto = watch("challengePhoto");
    useImagePreview({ challengePhoto, setImage, setPreview });

    // Clean up for preview
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // If title was written in topCreateChallenge, put it here as well
    useEffect(() => {
        if (isOpen) {
            reset({ challengeName: challengeTitle });
        }
    }, [isOpen, challengeTitle, reset]);

    const onSubmit = async (data: SubmitChallengeInterface) => {
        const formData = createFormDataChallenge(data);

        const isSuccessfullySubmitted = await handleCreateChallengeSubmit(
            formData
        );

        if (isSuccessfullySubmitted) {
            toast.success("Challenge created successfully!");
            setIsOpen(false);
            reset();
            setImage(null);
            setPreview(null);
            setChallengeTitle("");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        } else {
            toast.error("Couldn't Create a challenge. Try again later");
            throw new Error("API returned an error");
        }
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="bg_main text_main">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Create a challenge!
                        </DialogTitle>
                        <DialogDescription className="text_main">
                            Fill in the details below to create your challenge.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-6">
                            <label htmlFor="challengeName">
                                The name of the challenge
                            </label>
                            <Input
                                className="my-2"
                                type="text"
                                id="challengeName"
                                placeholder="Challenge name"
                                {...register("challengeName")}
                            />
                            {errors.challengeName && (
                                <p className="text-red-500">
                                    {errors.challengeName.message}
                                </p>
                            )}
                        </div>
                        <div className="mt-6">
                            <label htmlFor="challengeDesc">
                                Description for challenge:
                            </label>
                            <Textarea
                                className="my-2"
                                id="challengeDesc"
                                placeholder="Your description..."
                                {...register("challengeDesc")}
                            />
                            {errors.challengeDesc && (
                                <p className="text-red-500">
                                    {errors.challengeDesc.message}
                                </p>
                            )}
                        </div>
                        <div className="mt-6">
                            <label htmlFor="challengePhoto">
                                Image preview
                            </label>
                            {!image && (
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="my-2"
                                    id="challengePhoto"
                                    {...register("challengePhoto")}
                                />
                            )}
                            <div>
                                {preview && (
                                    <div className="relative w-full h-30">
                                        <Image
                                            src={preview}
                                            fill
                                            alt="Image for the post"
                                            className="mt-4 object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            {errors.challengePhoto?.message && (
                                <p className="text-red-500 mt-4">
                                    {String(errors.challengePhoto.message)}
                                </p>
                            )}
                        </div>
                        <div className="my-4 flex items-center justify-between">
                            <div>
                                <label htmlFor="startDate">Start day</label>
                                <div>
                                    <Input
                                        type="date"
                                        id="startDate"
                                        className="mt-2"
                                        {...register("startDate")}
                                    />
                                    {errors.startDate && (
                                        <p className="text-red-500">
                                            {errors.startDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="endDate">End day</label>
                                <div>
                                    <Input
                                        type="date"
                                        id="endDate"
                                        className="mt-2"
                                        {...register("endDate")}
                                    />
                                    {errors.endDate && (
                                        <p className="text-red-500">
                                            {errors.endDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="green cursor-pointer"
                            >
                                Create a challenge
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
