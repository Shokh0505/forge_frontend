import { toast } from "sonner";

export default async function toggleAllowMessagesAsync() {
    try {
        const promise = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/toggleAllowMessages/`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!promise.ok) {
            throw new Error("Something went wrong. please try again later");
        }

        toast.message("Successfully updated");
    } catch (error) {
        const err = error as Error;
        toast.message(err.message || "Internal Server Error");
    }
}
