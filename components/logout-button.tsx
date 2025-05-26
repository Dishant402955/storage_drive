import React from "react";
import { LogOut } from "lucide-react";
import { signOutUser } from "@/lib/actions/users.action";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const LogoutButton = () => {
	return (
		<div className="absolute right-8 top-8 cursor-pointer">
			<form
				action={async () => {
					"use server";

					await signOutUser();

					redirect("/login");
				}}
			>
				<Button type="submit" className="cursor-pointer">
					<LogOut />
				</Button>
			</form>
		</div>
	);
};

export default LogoutButton;
