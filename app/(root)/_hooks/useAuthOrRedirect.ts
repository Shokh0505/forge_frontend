import fetchUser from "@/lib/fetchUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthOrRedirect() {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const isUserFetchedSuccessfully = await fetchUser();
            if (!isUserFetchedSuccessfully) {
                router.push("/login");
            }
        };
        checkUser();
    }, []);
}
