"use client";

import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import UserProfile from "./user-profile";

export function NavUser({ user }: any) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<UserProfile user={user} asChild>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						asChild
					>
						<div className="flex items-center gap-2">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={
										user.avatar ||
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoCQstoZnSYlNQT8BnZdscCR_RjAKQVedSA&uspq=CAU"
									}
									alt={user.name}
								/>
								<AvatarFallback className="rounded-lg">U</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</div>
					</SidebarMenuButton>
				</UserProfile>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
