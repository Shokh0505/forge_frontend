import { PersonChat } from "./person_chat/person_chat";

export const Inbox = () => {
    return (
        <div className="px-32 pb-4 mt-12 overflow-auto">
            <h2 className="text-3xl font-semibold">Inbox</h2>
            <div className="mt-8 rounded-xl bg_secondary py-8 px-10">
                <PersonChat />
                <PersonChat />
                <PersonChat />
                <PersonChat />
                <PersonChat />
            </div>
        </div>
    );
};
