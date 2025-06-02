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
        const user = res.user;
        updateUser({
            username: user.username,
            email: user.email,
            profile_photo: user.profile_photo,
            bio: res.bio,
        });
        return true;
    } catch (error) {
        console.log("Internal Server Error", error);
        return false;
    }
}
