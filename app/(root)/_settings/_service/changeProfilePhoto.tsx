import { toast } from "sonner";

export default async function changeProfilePhoto(profile_num: number) {
    try {
        const promise = await fetch(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/changeProfilePhoto/`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ picture: `profile${profile_num}.jpg` }),
            }
        );

        if (!promise.ok) throw new Error("Couldn't update the profile picture");
    } catch {
        toast.error("Something went wrong. Please try again later");
    }
}
