import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const djangoRes = await fetch(`${process.env.BACKEND_API_URL}signup/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const result = await djangoRes.json();

        if (!djangoRes.ok) {
            return NextResponse.json(
                { error: result.error || "Signup failed" },
                { status: djangoRes.status }
            );
        }

        return NextResponse.json(result, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
