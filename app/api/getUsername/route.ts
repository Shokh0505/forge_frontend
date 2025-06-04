import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();
        const { id } = requestData;

        const authCookie = req.cookies.get("Authorization");
        const authHeader = authCookie ? authCookie.value : null;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const resDjango = await fetch(
            `${process.env.BACKEND_API_URL}get_username/`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ id: id }),
            }
        );

        if (!resDjango.ok) {
            return NextResponse.json({ status: resDjango.status });
        }
        const data = await resDjango.json();

        return NextResponse.json(data, { status: 200 });
    } catch {
        return NextResponse.json(
            {
                message: "Internal server error",
            },
            { status: 400 }
        );
    }
}
