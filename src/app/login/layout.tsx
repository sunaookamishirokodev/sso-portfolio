import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shiroko's Login",
};

export default function ResourcesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
