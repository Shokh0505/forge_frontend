import useUser from "@/store/user";

export default async function fetchUser() {
    const { updateUser } = useUser.getState();

    try {
        const response = await fetch("http://localhost:3000/api/whichUser/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const res = await response.json();

        if (!response.ok) {
            console.log(
                "Problem with status code of getuser: ",
                response.status
            );
            return false;
        }

        updateUser({
            username: res.user,
            email: res.email,
            profile_photo: res.profile_photo,
        });
        return true;
    } catch {
        console.log("Internal Server Error");
        return false;
    }
}
