import React from "react";

const Type = async ({ params }: any) => {
	const { type } = await params;
	return (
		<div className="w-full h-[95%] flex justify-center items-center">
			{type}
		</div>
	);
};

export default Type;
