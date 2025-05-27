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
	SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NavUser } from "@/components/nav-user";

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

export function AppSidebar(user: any) {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="w-full text-2xl my-4 flex justify-center items-center">
						Storage Drive
					</SidebarGroupLabel>
					<SidebarGroupContent className="my-8 flex flex-col justify-between ">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem
									key={item.title}
									className={`${
										pathname === item.url
											? "bg-neutral-800 text-white rounded-2xl hover:bg-neutral-700 hover:text-white"
											: ""
									}`}
								>
									<SidebarMenuButton
										asChild
										className={`justify-start items-center text-lg flex  my-2 pl-8 gap-x-4 ${
											pathname === item.url
												? " hover:bg-neutral-700 hover:text-white"
												: ""
										}`}
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarFooter>
					<NavUser user={user} asChild />
				</SidebarFooter>
			</SidebarContent>
		</Sidebar>
	);
}
