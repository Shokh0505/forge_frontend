"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const router = useRouter();

    // Functions
    const onSubmit = async (data: {
        username: string;
        email: string;
        password: string;
    }) => {
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Signup failed");
            toast.success("Signup successful");

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            console.error(
                "Error:",
                error instanceof Error ? error.message : "Unknown error"
            );
            if (error instanceof Error) {
                toast.error(`${error.message}`);
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    return (
        <div className="border p-8 min-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-semibold mb-2 text-4xl text-center">
                    Signup
                </h3>
                <hr className="my-4" />
                <label htmlFor="username" className="font-medium text-xl">
                    Username
                </label>
                <Input
                    {...register("username")}
                    name="username"
                    type="text"
                    placeholder="Your username"
                    id="username"
                    className="mt-4 mb-4"
                    required
                />
                {errors.username && <p>{errors.username.message}</p>}
                <label htmlFor="email" className="font-medium text-xl">
                    Email
                </label>
                <Input
                    {...register("email")}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="my-4"
                    required
                />
                {errors.email && <p>{errors.email.message}</p>}
                <label htmlFor="password" className="font-medium text-xl">
                    Password
                </label>
                <Input
                    {...register("password")}
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="mt-4"
                    required
                />
                {errors.password && <p>{errors.password.message}</p>}
                <Button className="green text-xl w-full mt-8 py-2 h-auto cursor-pointer">
                    Signup
                </Button>
                <hr className="mt-4 bg-gray-400" />
                <div className="mt-4 text-gray-400 flex items-center justify-center font-medium">
                    <Link href="/login">Login</Link>
                </div>
            </form>
            <Toaster />
        </div>
    );
}
