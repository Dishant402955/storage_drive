import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import LogoutButton from "./logout-button";

const UserProfile = (props: any) => {
	return (
		<Dialog>
			<DialogTrigger className="w-full">
				<div className="w-full">{props.children}</div>
			</DialogTrigger>
			<DialogContent className="px-6">
				<DialogHeader>
					<DialogTitle>User Profile</DialogTitle>
				</DialogHeader>
				<div className="flex justify-between gap-x-4">
					<Image
						src={props.user.Avatar}
						height={30}
						width={50}
						alt="avatar"
						className=""
					/>
					<div className="flex flex-col">
						<p>Username: {props.user.fullName}</p>
						<p>Email : {props.user.email}</p>
					</div>
				</div>
				<LogoutButton>Log Out</LogoutButton>
			</DialogContent>
		</Dialog>
	);
};

export default UserProfile;
