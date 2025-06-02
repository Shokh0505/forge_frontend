import { toast } from "sonner";

type AllowedMessagingInterface = {
    isAllowed: boolean;
    id: string;
};

export default async function allowedMessaging(id: string) {
    try {
        console.log(id);
        const resPromise = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/allowedMessagingUser/`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ id: id }),
            }
        );

        if (!resPromise.ok) {
            throw new Error("Couldn't get data about allow messaging");
        }

        const res: AllowedMessagingInterface = await resPromise.json();

        if (!res.isAllowed) {
            toast.message("Writing to this user is not allowed");
            return false;
        }

        if (id == res.id) {
            toast.message("You can't message yourself");
            return false;
        }
    } catch (error) {
        const err = error as Error;
        toast.error(err.message || "Internal server error.");
    }
}
