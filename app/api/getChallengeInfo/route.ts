import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        if (!process.env.BACKEND_API_URL) {
            return NextResponse.json(
                { error: "API URL is not defined." },
                { status: 500 }
            );
        }

        const { id } = await req.json();
        const authCookie = req.cookies.get("Authorization");
        const authHeader = authCookie ? authCookie.value : null;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const djangoRes = await fetch(
            `${process.env.BACKEND_API_URL}groupChallangeStats/`,
            {
                method: "POST",
                headers,
                body: JSON.stringify({ challengeID: id }),
            }
        );

        if (!djangoRes.ok) {
            return NextResponse.json(
                {
                    error: `Problem with getting info about the challenge.`,
                },
                { status: djangoRes.status }
            );
        }

        const data = await djangoRes.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
