import { toast } from "sonner";

export default async function deleteWhitelistedPerson(id: string) {
    try {
        const promise = await fetch(
            process.env.NEXT_PUBLIC_FRONTEND_URL +
                "api/deleteWhitelistedPerson/",
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ id: id }),
            }
        );

        if (!promise.ok) {
            throw new Error("Couldn't remove the user from whitelist");
        }

        toast.message("Successfully deleted user from whitelist");
        return true;
    } catch (error) {
        const err = error as Error;

        toast.message(err.message || "Internal server error");
    }
}
