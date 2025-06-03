"use client";
import { toast } from "sonner";
import { PersonChat } from "./components/person_chat";
import { useRouter } from "next/navigation";
import useInboxPeople from "./_hooks/inboxPeople";
import { inboxPeopleChatInterface } from "@/interfaces/interfaces";

export default function Inbox() {
    const router = useRouter();
    const { inboxPeople, loading, error } = useInboxPeople();
    console.log(inboxPeople);
    const handleNavigateChat = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.currentTarget.getAttribute("data-id");
        if (target) {
            router.push(
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}chat/${target}`
            );
        } else {
            toast.message("Coudn't get the chat for the user");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-full lg:px-12 pb-4 mt-12 overflow-auto">
            <h2 className="text-3xl font-semibold">Inbox</h2>
            <div className="mt-8 rounded-xl bg_secondary py-2 lg:py-8 px-4 lg:px-10">
                {inboxPeople.map(
                    (chat: inboxPeopleChatInterface, indx: number) => (
                        <div
                            key={indx}
                            data-id={chat.user.id}
                            onClick={handleNavigateChat}
                        >
                            <PersonChat
                                username={chat.user.username}
                                profile_photo={chat.user.profile_photo}
                                last_message={chat.last_message.message}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
