"use client";

import { cn, getFileType } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
	initial: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 20,
		y: -20,
		opacity: 0.9,
	},
};

const secondaryVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export const FileUpload = ({
	onChange,
}: {
	onChange?: (files: File[]) => void;
}) => {
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (newFiles: File[]) => {
		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		onChange && onChange(newFiles);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, isDragActive } = useDropzone({
		multiple: true, // ✅ Allow multiple files
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: (error) => {
			console.log(error);
		},
	});

	return (
		<div
			className="w-[30%] bg-neutral-700 rounded-lg pb-4 px-2 absolute bottom-10 right-10 max-[1300px]:right-[25%] max-[1300px]:w-[50%] max-[900px]:w-[80%] max-[900px]:right-[10%]"
			{...getRootProps()}
		>
			<motion.div
				onClick={handleClick}
				whileHover="animate"
				className="p-1 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
			>
				<input
					ref={fileInputRef}
					id="file-upload-handle"
					type="file"
					multiple // ✅ Allow selecting multiple files manually
					onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
					className="hidden"
				/>
				<div className="flex flex-col items-center justify-center">
					<div className="relative w-full my-1 max-w-xl mx-auto">
						{files.length > 0 &&
							files.map((file, idx) => {
								const { type, extension } = getFileType(file.name);
								return (
									<motion.div
										key={"file" + idx}
										layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
										className={cn(
											"relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start  py-2  px-4 mt-4 w-full mx-auto rounded-md",
											"shadow-sm"
										)}
									>
										<div className="flex justify-between w-full items-center ">
											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												layout
												className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-[60%]"
											>
												{file.name}
											</motion.p>
											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												layout
												className="rounded-lg px-2 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
											>
												{(file.size / 1024).toFixed(2)} KB
											</motion.p>

											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												layout
												className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-[30%]"
											>
												{type}/{extension}
											</motion.p>
										</div>
									</motion.div>
								);
							})}
						{!files.length && (
							<motion.div
								layoutId="file-upload"
								variants={mainVariant}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 12,
								}}
								className={cn(
									"relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-12 mt-4 w-full max-w-[4rem] mx-auto rounded-md",
									"shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
								)}
							>
								{isDragActive ? (
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-neutral-600 flex flex-col items-center"
									>
										Drop it
										<IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
									</motion.p>
								) : (
									<IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
								)}
							</motion.div>
						)}

						{!files.length && (
							<motion.div
								variants={secondaryVariant}
								className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
							></motion.div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};
