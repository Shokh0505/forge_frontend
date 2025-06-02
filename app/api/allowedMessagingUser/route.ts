import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data);
        const { id } = data;

        if (!id) {
            return NextResponse.json(
                { message: "error. ID is not provided" },
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
            `${process.env.BACKEND_API_URL}allowed_messaging/`,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ id: id }),
            }
        );

        if (!resDjango.ok) {
            return NextResponse.json({ status: resDjango.status });
        }

        const dataResponse = await resDjango.json();

        return NextResponse.json(
            { id: dataResponse.id, isAllowed: dataResponse.isAllowed },
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
