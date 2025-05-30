import { toast } from "sonner";

export default async function changeBIO(bio: string) {
    try {
        const promise = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/changeBIO/`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ bio: bio }),
            }
        );

        if (!promise.ok) {
            throw new Error("something went wrong");
        }

        if (promise.status === 200) toast.message("Successfully updated BIO!");

        return true;
    } catch {
        toast.error("Internal Server Error.");
    }
}
