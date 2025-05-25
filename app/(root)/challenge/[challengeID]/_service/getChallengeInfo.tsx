import { ChallengeInfoInterface } from "@/interfaces/interfaces";
import { toast } from "sonner";

export default async function getChallengeInfo(
    id: string
): Promise<ChallengeInfoInterface | undefined> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/getChallengeInfo/`,
        {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ id: id }),
        }
    );

    if (!res.ok) {
        toast.message("Couldn't get challenge info");
        return;
    }

    const resData = await res.json();

    return {
        isJoined: resData.data.isJoined,
        isFinshedToday: resData.data.isFinishedToday,
        daysPassed: resData.data.daysPassed,
        todayGroupCompletePercent: resData.data.todayGroupCompletePercent,
        streakGroup: resData.data.streakGroup,
        topLeaders: resData.data.topLeaders,
        owner: resData.data.owner,
        challengeTitle: resData.data.challengeTitle,
    };
}
