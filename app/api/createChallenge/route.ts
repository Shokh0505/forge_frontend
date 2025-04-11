import { NextResponse, NextRequest } from "next/server";

const formatDate = (date: string | Date) =>
    new Date(date).toISOString().split("T")[0];

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Deconstruct the data to validate them(bilaman django da ham qilsa bo'ladi)
        // yana bir qatlam himoya yaxshida boribir
        const challengeName = formData.get("challengeName")?.toString();
        const challengeDesc = formData.get("challengeDesc")?.toString();
        const challengePhoto = formData.get("challengePhoto");
        const startDate = formData.get("startDate")?.toString();
        const endDate = formData.get("endDate")?.toString();

        if (!challengeName || !challengeDesc || !startDate || !endDate) {
            return NextResponse.json(
                {
                    error: "Missing required fields",
                },
                { status: 400 }
            );
        }
        const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (challengePhoto && challengePhoto instanceof File) {
            if (challengePhoto.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: "The image size exceeds 5 MBs" },
                    { status: 400 }
                );
            }
            if (!allowedFileTypes.includes(challengePhoto.type)) {
                return NextResponse.json(
                    { error: "Only jpg, jpeg and png file images are allowed" },
                    { status: 400 }
                );
            }
        }

        // Finally sending it to backend
        const djangoFormData = new FormData();
        djangoFormData.append("challenge_title", challengeName);
        djangoFormData.append("description", challengeDesc);
        djangoFormData.append("start_time", formatDate(startDate));
        djangoFormData.append("finish_time", formatDate(endDate));
        if (challengePhoto)
            djangoFormData.append("challenge_photo", challengePhoto);

        // Samolyot uchishga tayyorlanyapti
        if (!process.env.BACKEND_API_URL) {
            return NextResponse.json(
                { error: "API URL is not defined." },
                { status: 500 }
            );
        }
        const authCookie = req.cookies.get("Authorization");
        const authHeader = authCookie ? authCookie.value : null;

        const headers: HeadersInit = {};
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const djangoResponse = await fetch(
            `${process.env.BACKEND_API_URL}createChallenge/`,
            {
                method: "POST",
                body: djangoFormData,
                headers: headers,
            }
        );

        // Check Django response
        if (!djangoResponse.ok) {
            const errorData = await djangoResponse.text();
            return NextResponse.json(
                { error: errorData || "Failed to create challenge in backend" },
                { status: djangoResponse.status }
            );
        }

        const responseData = await djangoResponse.json();

        return NextResponse.json(
            { message: "Challenge created successfully", data: responseData },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in createChallenge route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
