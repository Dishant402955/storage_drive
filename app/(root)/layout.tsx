import type { Metadata } from "next";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/actions/users.action";
import { redirect } from "next/navigation";
import FileUpload from "@/components/file-upload";
import Search from "@/components/search";
import LogoutButton from "@/components/logout-button";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Storage Drive",
	description: "A Storage Solution to store all of your Docs",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/login");
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`antialiased`}>
				<SidebarProvider>
					<AppSidebar {...user} />
					<main className="w-full">
						<SidebarTrigger className="h-[5%]" />
						{children}

						<FileUpload />
						<Search />
					</main>
				</SidebarProvider>
				<Toaster />
			</body>
		</html>
	);
}
