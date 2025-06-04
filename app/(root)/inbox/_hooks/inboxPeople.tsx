"use client";
import { useEffect, useState } from "react";
import getPeopleInbox from "../_service/getPeople";
import { inboxPeopleChatInterface } from "@/interfaces/interfaces";

export default function useInboxPeople() {
    const [inboxPeople, setInboxPeople] = useState<
        inboxPeopleChatInterface[] | []
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getPeopleInbox();
                setInboxPeople(data.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    return { inboxPeople, loading, error };
}
