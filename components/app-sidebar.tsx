"use client";

import { Home } from "lucide-react";
import { IoDocuments } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
	{
		title: "Dashboard",
		url: "/",
		icon: Home,
	},
	{
		title: "Documents",
		url: "/documents",
		icon: IoDocuments,
	},
	{
		title: "Images",
		url: "/images",
		icon: FaImages,
	},
	{
		title: "Media",
		url: "/media",
		icon: MdPermMedia,
	},
	{
		title: "Others",
		url: "/others",
		icon: GiPerspectiveDiceSixFacesRandom,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="w-full text-2xl my-4 flex justify-center items-center">
						Storage Drive
					</SidebarGroupLabel>
					<SidebarGroupContent className="my-8">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem
									key={item.title}
									className={`${
										pathname === item.url
											? "bg-neutral-800 text-white rounded-2xl"
											: ""
									}`}
								>
									<SidebarMenuButton
										asChild
										className={`justify-start items-center ml-6 gap-x-4 text-lg flex p-1.5 my-2`}
									>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
