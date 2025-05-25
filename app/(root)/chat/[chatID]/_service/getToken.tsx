import { toast } from "sonner";

export default async function getToken() {
    const token = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getToken`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!token.ok) {
        toast.message("Problem with authentication.");
        return;
    }

    const { token: tokenValue } = await token.json();
    const finalToken = tokenValue.split(/\s+/)[1];

    return finalToken;
}
