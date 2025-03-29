import Image from "next/image";

const Profile = () => {
    return (
        <div className="rounded-full overflow-hidden">
            <Image
                src={"/profile.jpg"}
                width={36}
                height={36}
                alt="The profile picture"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Profile;
