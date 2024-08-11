import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Shiroko's Login",
};

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Suspense fallback={<></>}>{children}</Suspense>;
}
