import useAccessToken from "@/store/accessToken";

export default async function getWithAuth(url, options = {}) {
    const accessToken = useAccessToken.getState().accessToken;

    let response = fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        },
        credentials: "include",
    });

    if (response.status === 401) {
        const refreshResponse = fetch(`${process.env.BACKEND_API_URL}api/token/refresh/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })

        if (refreshResponse.ok) {
            const data = (await refreshResponse).json();
            useAccessToken.getState().setAccessToken(data.access)

            return fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${data.access}`,
                },
                credentials: "include",
            })
        }
        else {
            useAccessToken.getState().setAccessToken(null);
            window.location.href = '/login';
        }
    }

}