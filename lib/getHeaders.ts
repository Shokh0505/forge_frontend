// utils/getHeaders.ts
import cookie from "cookie";

export function getAuthHeaders(request: Request): HeadersInit {
    const cookies = cookie.parse(request.headers.get("cookie") || "");
    const authHeader = cookies.Authorization || null;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (authHeader) {
        headers["Authorization"] = `Token ${authHeader}`;
    }

    return headers;
}
