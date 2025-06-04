import { toast } from "sonner";

export default async function getUsername(id: string) {
    try {
        const promise = await fetch(
            process.env.NEXT_PUBLIC_FRONTEND_URL + "api/getUsername",
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ id: id }),
            }
        );

        if (!promise.ok) {
            throw new Error("Problem with getting the user username");
        }

        const data = await promise.json();

        return data;
    } catch (error) {
        const err = error as Error;
        toast.message(err.message || "Internal server error");
    }
}
