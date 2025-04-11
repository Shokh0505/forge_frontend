import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 charecters long"),
    email: z.string().email("Invalid Email"),
    password: z
        .string()
        .min(
            6,
            "The same weak password for all accounts, huh? make it longer."
        ),
});

export const loginSchema = z.object({
    username: z.string().min(2, "Your username is less then 3 charecters"),
    password: z.string().min(6, "Your password is less than 6 charecters"),
});

export const createChallengeSchema = z
    .object({
        challengeName: z
            .string()
            .min(3, "At least 3 characters are needed for the title")
            .max(100, "Title cannot exceed 100 characters"),
        challengeDesc: z
            .string()
            .min(1, "Description cannot be empty")
            .max(1000, "Description cannot exceed 1000 characters"),
        challengePhoto: z
            .any()
            .transform((val) => val?.[0])
            .refine((file) => file instanceof File, {
                message: "Please upload a valid image file",
            })
            .refine((file) => file?.size <= 5 * 1024 * 1024, {
                message: "Image must be less than 5MB",
            })
            .refine(
                (file) =>
                    !file ||
                    ["image/jpeg", "image/png", "image/jpg"].includes(
                        file.type
                    ),
                {
                    message: "Only JPEG, PNG and JPG images are allowed",
                }
            )
            .optional(),
        startDate: z
            .string()
            .transform((val) => new Date(val))
            .refine((date) => !isNaN(date.getTime()), "Invalid start date"),
        endDate: z
            .string()
            .transform((val) => new Date(val))
            .refine((date) => !isNaN(date.getTime()), "Invalid end date"),
    })
    .refine((data) => data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    });
