import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { picture } = data;

        if (!picture) {
            return NextResponse.json(
                { message: "error. Picture was not provided" },
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
            `${process.env.BACKEND_API_URL}update_profile_picture/`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ picture: picture }),
            }
        );

        if (!resDjango.ok) {
            return NextResponse.json(
                {
                    message:
                        "Couldn't update the profile photo. Please try again later",
                },
                { status: resDjango.status }
            );
        }

        return NextResponse.json(
            { message: "Successfully updated profile picuture!" },
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
