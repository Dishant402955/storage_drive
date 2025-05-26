import React from "react";
import Search from "./search";
import FileUpload from "./file-upload";
import LogoutButton from "./logout-button";

const Navbar = () => {
	return (
		<div className="flex justify-between items-center w-full py-4 px-8">
			<Search />
			<div className="flex justify-between items-center w-fit px-1">
				<FileUpload />
				<LogoutButton />
			</div>
		</div>
	);
};

export default Navbar;
