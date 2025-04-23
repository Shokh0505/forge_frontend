import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { id } = data;

        if (!id) {
            return NextResponse.json(
                { message: "error. ID was not provided" },
                { status: 400 }
            );
        }

        const authCookie = req.cookies.get("Authorization");
        const authHeader = authCookie ? authCookie.value : null;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const resDjango = await fetch(
            `${process.env.BACKEND_API_URL}finishChallengeToday/`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ challengeID: id }),
            }
        );

        if (!resDjango.ok) {
            return NextResponse.json(
                {
                    message:
                        "Couldn't add to the challenge. Please try again later",
                },
                { status: resDjango.status }
            );
        }

        return NextResponse.json(
            { message: "Successfully joined the challenge!" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            {
                message: "Internal server error",
            },
            { status: 400 }
        );
    }
}
