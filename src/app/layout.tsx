import { Roboto_Condensed } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/LoadingComponent";

const roboto = Roboto_Condensed({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Aniua",
    description: "Дивитись аніме українською онлайн у високій якості.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.className} antialiased`}>
                <Loading />
                <Header />
                {children}
            </body>
        </html>
    );
}
