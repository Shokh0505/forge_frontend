import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const authCookie = req.cookies.get("Authorization");
        const authHeader = authCookie ? authCookie.value : null;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const resDjango = await fetch(
            `${process.env.BACKEND_API_URL}get_whiteListed_people/`,
            {
                method: "GET",
                headers: headers,
            }
        );

        if (!resDjango.ok) {
            return NextResponse.json({ status: resDjango.status });
        }
        const data = await resDjango.json();

        return NextResponse.json(
            {
                whiteListedPeople: data,
            },
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
