import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "./_components/navbar";
import { Inter } from "next/font/google";
import { Leftbar } from "./_components/leftbar";

export const metadata: Metadata = {
    title: "My App - Main Section",
    description: "Explore the main sections of my app",
};

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default function RootGroupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`${inter.variable} font-sans antialiased bg_main px-10 min-h-screen`}
        >
            <Navbar />
            <div className="flex justify-between items-start text_main w-full">
                <aside className="mt-12 hidden lg:block lg:flex-1/4">
                    <Leftbar />
                </aside>
                <div className="w-full lg:flex-3/4 h-[calc(100vh-10.25rem)] overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    );
}
