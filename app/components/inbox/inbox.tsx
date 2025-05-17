import { toast } from "sonner";
import { PersonChat } from "./person_chat/person_chat";
import { useRouter } from "next/navigation";

export const Inbox = () => {
    const router = useRouter();
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

    return (
        <div className="px-32 pb-4 mt-12 overflow-auto">
            <h2 className="text-3xl font-semibold">Inbox</h2>
            <div className="mt-8 rounded-xl bg_secondary py-8 px-10">
                <div data-id="6" onClick={handleNavigateChat}>
                    <PersonChat username="somebody" />
                </div>
            </div>
        </div>
    );
};
