import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        if (!process.env.BACKEND_API_URL) {
            return NextResponse.json(
                { error: "API URL is not defined." },
                { status: 500 }
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

        const djangoRes = await fetch(`${process.env.BACKEND_API_URL}whoAmI/`, {
            method: "GET",
            headers: headers,
        });

        if (!djangoRes.ok) {
            return NextResponse.json(
                {
                    error: "Problem with authentication. If problem persists, please try to log in again.",
                },
                { status: djangoRes.status }
            );
        }

        const data = await djangoRes.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching data from Django:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
