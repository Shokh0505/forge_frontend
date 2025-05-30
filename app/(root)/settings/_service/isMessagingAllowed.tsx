import { toast } from "sonner";

export default async function isMessagingAllowed() {
    try {
        const promise = await fetch(
            process.env.NEXT_PUBLIC_FRONTEND_URL + "api/isMessagingAllowed/",
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!promise.ok) {
            throw new Error("Couldn't get data about allow messaging");
        }

        const data = await promise.json();
        return data;
    } catch (error) {
        const err = error as Error;
        toast.error(err.message || "Internal server error.");
    }
}
