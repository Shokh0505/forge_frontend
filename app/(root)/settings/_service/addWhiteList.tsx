import { toast } from "sonner";

export default async function addWhiteList(username: string) {
    try {
        const promise = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/addWhiteList/`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ username: username }),
            }
        );

        if (!promise.ok) {
            throw new Error();
        }

        toast.message("Added to white list successfully");
    } catch {
        toast.message("Something went wrong. Please try again later!");
    }
}
