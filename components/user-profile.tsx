// {
//     fullName: 'random',
//     email: 'engineer.420.007@gmail.com',
//     Avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoCQstoZnSYlNQT8BnZdscCR_RjAKQVedSA&uspq=CAU',
//     accountId: '68352fd90002ecd54521',
//     '$id': '68352fd9001fe5e6f8d4',
//     '$createdAt': '2025-05-27T03:22:01.731+00:00',
//     '$updatedAt': '2025-05-27T03:22:01.731+00:00',
//     '$permissions': [],
//     files: [],
//     '$databaseId': '6833f65000228b87e5ae',
//     '$collectionId': '6833f67b002b426cd8b6'
//   }

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
			<DialogContent>
				<DialogHeader>
					<DialogTitle>User Profile</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col">
					<p>Username: {props.user.fullName}</p>
					<p>Email : {props.user.email}</p>
					<Image src={props.user.Avatar} height={50} width={50} alt="avatar" />
					<LogoutButton>Logout</LogoutButton>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UserProfile;
