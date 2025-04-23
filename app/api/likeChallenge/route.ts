import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    return handleLikeOrUnlike(request, "POST");
}

export async function DELETE(request: NextRequest) {
    return handleLikeOrUnlike(request, "DELETE");
}

async function handleLikeOrUnlike(
    request: NextRequest,
    method: "POST" | "DELETE"
) {
    try {
        if (!process.env.BACKEND_API_URL) {
            return NextResponse.json(
                { error: "API URL is not defined." },
                { status: 500 }
            );
        }

        const { id } = await request.json();
        const authCookie = request.cookies.get("Authorization");
        const authHeader = authCookie ? authCookie.value : null;

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const djangoRes = await fetch(
            `${process.env.BACKEND_API_URL}likeChallenge/`,
            {
                method,
                headers,
                body: JSON.stringify({ id }),
            }
        );

        if (!djangoRes.ok) {
            return NextResponse.json(
                {
                    error: `Problem with ${
                        method === "POST" ? "liking" : "unliking"
                    } the challenge.`,
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
