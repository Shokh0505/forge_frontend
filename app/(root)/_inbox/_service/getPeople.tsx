export default async function getPeopleInbox() {
    const dataPromise = await fetch("api/getInboxPeople/");
    if (!dataPromise.ok)
        throw new Error("Couldn't get messaged people. Please try again later");

    return dataPromise.json();
}
