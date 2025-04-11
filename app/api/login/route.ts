import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        const response = await axios.post(
            "http://localhost:8000/api-token-auth/",
            {
                username,
                password,
            }
        );

        const token = response.data.token;

        const res = NextResponse.json({ message: "Login successful" });

        res.headers.set(
            "Set-Cookie",
            serialize("Authorization", `Token ${token}`, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
        );

        return res;
    } catch {
        return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }
}
