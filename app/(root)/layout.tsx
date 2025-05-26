import type { Metadata } from "next";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";

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
		<html lang="en" suppressHydrationWarning>
			<body className={` antialiased`}>
				<SidebarProvider>
					<AppSidebar />
					<main className="w-full">
						<div className="flex w-full">
							<SidebarTrigger />
							<Navbar />
						</div>
						{children}
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
