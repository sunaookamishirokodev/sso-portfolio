import type { Metadata } from "next";
import "./globals.css";

const { NEXT_PUBLIC_FACEBOOK_URL, NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata: Metadata = {
	metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
	title: "Shiroko's SSO",
	description:
		"Hello everyone, I'm Shiroko - a normal student who likes to code, watch anime, play games and communicate with people. So you can hire me to code your website, portfolio, economy, advertising website but not 18+ or illegal. Furthermore, I am the administrator of Elaina Team - a new technology team in Vietnam and I am really happy if I can be of any help to you. Thanks for reading, have a great day!",
	authors: {
		url: NEXT_PUBLIC_FACEBOOK_URL,
		name: "Trung Lê (Shiroko)",
	},
	generator: "NextJS TailwinCSS TypeScript",
	keywords: [
		"Portfolio",
		"Profile",
		"Shiroko",
		"2007",
		"Programmer",
		"Coder",
		"Developer",
		"ElainaTeam",
		"Fullstack",
		"Bot",
	],
	referrer: "origin-when-cross-origin",
	publisher: "Sunaookami Shiroko",
	creator: "Sunaookami Shiroko",
	formatDetection: {
		address: false,
		telephone: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			{children}
		</html>
	);
}
