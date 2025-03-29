import "../styles/globals.css";
export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body className="bg_main text_main flex items-center justify-center min-h-screen">
                {children}
            </body>
        </html>
    );
}
