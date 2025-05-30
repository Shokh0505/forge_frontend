import { toast } from "sonner";

export default async function getWhiteListedPeople() {
    try {
        const promise = await fetch(
            process.env.NEXT_PUBLIC_FRONTEND_URL + "api/getWhiteListedPeople",
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!promise.ok) {
            throw new Error(
                "Couldn't get white listed people. Please try again later"
            );
        }

        const data = await promise.json();
        return data.whiteListedPeople.data;
    } catch (error) {
        const err = error as Error;
        toast.message(
            err.message || "Something went wrong. Please try again later"
        );
    }
}
