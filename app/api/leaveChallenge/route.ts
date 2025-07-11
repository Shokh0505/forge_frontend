import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { id } = data;

        if (!id) {
            return NextResponse.json(
                { error: "Not valid id" },
                { status: 400 }
            );
        }

        const authCookie = request.cookies.get("Authorization");
        const authHeader = authCookie ? authCookie.value : null;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const resDjango = await fetch(
            `${process.env.BACKEND_API_URL}leaveChallenge/`,
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
                        "Couldn't remove from the challenge. Please try again later",
                },
                { status: resDjango.status }
            );
        }

        return NextResponse.json(
            { message: "Successfully removed from the challenge!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during POST request:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
