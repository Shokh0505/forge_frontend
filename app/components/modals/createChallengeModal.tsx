"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/app/components/ui/dialog";
import useOpenCreateChallenge from "@/store/openCreateChallenge";
import { Input } from "../ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChallengeSchema } from "@/schemas/schemas";
import { toast } from "sonner";

export const CreateChallengeModal = ({
    challengeTitle,
    setChallengeTitle,
}: {
    challengeTitle: string;
    setChallengeTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { isOpen, setIsOpen } = useOpenCreateChallenge();
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

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

    useEffect(() => {
        const fileList = challengePhoto as FileList | undefined;

        if (fileList?.[0] instanceof File) {
            const file = fileList[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }, [challengePhoto]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    useEffect(() => {
        if (isOpen) {
            reset({ challengeName: challengeTitle });
        }
    }, [isOpen, challengeTitle, reset]);

    const onSubmit = async (data: {
        challengeName: string;
        challengeDesc: string;
        challengePhoto?: File;
        startDate: Date;
        endDate: Date;
    }) => {
        const formData = new FormData();
        formData.append("challengeName", data.challengeName);
        formData.append("challengeDesc", data.challengeDesc);
        if (data.challengePhoto) {
            formData.append("challengePhoto", data.challengePhoto);
        }
        formData.append("startDate", data.startDate.toISOString());
        formData.append("endDate", data.endDate.toISOString());

        try {
            const res = await fetch("api/createChallenge/", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                toast.error(
                    errorMessage ||
                        "Couldn't Create a challenge. Try again later"
                );
                throw new Error("API returned an error");
            }

            toast.success("Challenge created successfully!");
            setIsOpen(false);
            reset();
            setImage(null);
            setPreview(null);
            setChallengeTitle("");
        } catch {
            toast.error("Internal Server Error(500)");
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
