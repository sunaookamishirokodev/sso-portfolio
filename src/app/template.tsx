// "use client";
import { JetBrains_Mono } from "next/font/google";
const mainFont = JetBrains_Mono({ subsets: ["latin"] });

export default function RootTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <body className={`${mainFont.className} flex bg-gradient-to-tr min-h-screen from-stone-200 to-cyan-50`} suppressHydrationWarning>
        <body className={`${mainFont.className} flex bg-shiroko-bg bg-cover min-h-screen`} suppressHydrationWarning>
            {children}
        </body>
    );
}
