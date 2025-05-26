import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
	title: "Sign In | Storage Drive",
	description: "A Storage Solution to store all of your Docs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={` flex justify-center items-center h-full`}>
				{children}
			</body>
		</html>
	);
}
