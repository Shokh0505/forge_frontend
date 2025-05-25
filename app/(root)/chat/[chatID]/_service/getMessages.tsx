import { toast } from "sonner";

export default async function getMessages(
    pageNumber: number,
    partnerID: string
) {
    const messagesPromise = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChatMessages/?page=${pageNumber}`,
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ partnerID: partnerID }),
        }
    );

    if (!messagesPromise.ok) {
        console.log("Promise was not ok. Debug it");
        toast.message("Ooops, something went wrong. Please try again later");
        return;
    }

    const data = await messagesPromise.json();
    return data;
}
