import { useEffect, useState } from "react";
import getPeopleInbox from "../_service/getPeople";

export default function useInboxPeople() {
    const [inboxPeople, setInboxPeople] = useState([]);
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
