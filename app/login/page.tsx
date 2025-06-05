"use client";
import { loginSchema } from "@/schemas/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });
    const router = useRouter();

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            const res = await fetch("api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Login failed");

            router.push("/");
        } catch (error) {
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
                    Login
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
                    className="mt-4 mb-8"
                    required
                />
                {errors.username && <p>{errors.username.message}</p>}
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
                    Log In
                </Button>
                <hr className="mt-4 bg-gray-400" />
                <div className="mt-4 text-gray-400 flex items-center justify-center font-medium">
                    <Link href="/signup">Sign Up</Link>
                </div>
            </form>
            <Toaster />
        </div>
    );
}
