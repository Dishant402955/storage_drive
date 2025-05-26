import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Storage Drive",
	description: "A Storage Solution to store all of your Docs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={` antialiased`}>{children}</body>
		</html>
	);
}
