export default async function getPeopleInbox() {
    const dataPromise = await fetch(
        process.env.NEXT_PUBLIC_FRONTEND_URL + "api/getInboxPeople/"
    );
    if (!dataPromise.ok)
        throw new Error("Couldn't get messaged people. Please try again later");

    return dataPromise.json();
}
