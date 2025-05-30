"use client";
import Image from "next/image";
import { ProfileProps } from "@/interfaces/interfaces";

const Profile = (data: ProfileProps) => {
    const { profile_photo } = data;

    return (
        <div className="rounded-full overflow-hidden">
            <Image
                src={profile_photo ? `/${profile_photo}` : "/default1.png"}
                width={36}
                height={36}
                alt="The profile picture"
                className="w-full h-full object-cover"
                priority
            />
        </div>
    );
};

export default Profile;
