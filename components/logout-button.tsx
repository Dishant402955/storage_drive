"use client";

import { LogOut } from "lucide-react";
import { signOutUser } from "@/lib/actions/users.action";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
	const handleSignOut = async () => {
		await signOutUser();
		redirect("/login");
	};
	return (
		<div className="cursor-pointer">
			<button
				type="submit"
				className="cursor-pointer w-full"
				onClick={handleSignOut}
			>
				{children}
			</button>
		</div>
	);
};

export default LogoutButton;
