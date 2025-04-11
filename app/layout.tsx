// app/layout.tsx
import type { Metadata } from "next";
import "./styles/globals.css"; // Import global styles
import { Inter } from "next/font/google";

// Set up the Inter font
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "My App",
    description: "A Next.js app with multiple layouts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Add global meta tags, scripts, or styles here if needed */}
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
