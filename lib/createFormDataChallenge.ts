import { SubmitChallengeInterface } from "@/interfaces/interfaces";

export function createFormDataChallenge(data: SubmitChallengeInterface) {
    const formData = new FormData();
    formData.append("challengeName", data.challengeName);
    formData.append("challengeDesc", data.challengeDesc);
    if (data.challengePhoto) {
        formData.append("challengePhoto", data.challengePhoto);
    }
    formData.append("startDate", data.startDate.toISOString());
    formData.append("endDate", data.endDate.toISOString());

    return formData;
}
