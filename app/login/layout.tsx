export const metadata = {
    title: "Login",
    description: "Forge - A challenge-based learning platform.",
    keywords: "Forge, challenges, learning, productivity, coding",
    author: "Shokhjahon Alijonov",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg_main text_main flex items-center justify-center min-h-screen">
            {children}
        </div>
    );
}
