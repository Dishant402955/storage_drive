"use client";

import { cn, getFileType } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

const mainVariant = {
	initial: { x: 0, y: 0 },
	animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
};

type UploadFile = {
	file: File;
	progress: number;
	status: "idle" | "uploading" | "done";
};

export const FileUpload = ({
	onChange,
}: {
	onChange?: (files: File[]) => void;
}) => {
	const [files, setFiles] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (newFiles: File[]) => {
		const newUploadFiles: UploadFile[] = newFiles.map((file) => ({
			file,
			progress: 0,
			status: "idle",
		}));
		setFiles((prev) => [...prev, ...newUploadFiles]);
		onChange?.(newFiles);
	};

	const removeFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const simulateUpload = () => {
		setUploading(true);

		files.forEach((fileObj, index) => {
			const sizeKB = fileObj.file.size / 1024;
			const estimatedTimeMs = sizeKB * 15; // Simulate 15ms per KB upload time
			const steps = 20;
			const increment = 100 / steps;
			const intervalTime = estimatedTimeMs / steps;

			let currentProgress = 0;

			const interval = setInterval(() => {
				currentProgress += increment;

				setFiles((prev) =>
					prev.map((f, i) =>
						i === index
							? {
									...f,
									progress: Math.min(currentProgress, 100),
									status: currentProgress >= 100 ? "done" : "uploading",
							  }
							: f
					)
				);

				if (currentProgress >= 100) {
					clearInterval(interval);

					// Remove this file after 2 seconds
					setTimeout(() => {
						setFiles((prev) => {
							const newFiles = [...prev];
							newFiles.splice(index, 1);
							return newFiles;
						});
					}, 2000);
				}
			}, intervalTime);
		});
	};

	const handleClick = () => fileInputRef.current?.click();

	const { getRootProps, isDragActive } = useDropzone({
		multiple: true,
		noClick: true,
		onDrop: handleFileChange,
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
					type="file"
					multiple
					onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
					className="hidden"
				/>

				<div className="flex flex-col items-center justify-center">
					<div className="relative w-full my-1 max-w-xl mx-auto">
						{files.length > 0 &&
							files.map((f, idx) => {
								const { type, extension } = getFileType(f.file.name);
								return (
									<motion.div
										key={"file" + idx}
										layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
										className={cn(
											"relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start py-2 px-4 mt-4 w-full mx-auto rounded-md shadow-sm"
										)}
									>
										<div className="flex justify-between w-full items-center gap-2">
											<div className="flex-1">
												<p className="text-base text-neutral-700 dark:text-neutral-300 truncate">
													{f.file.name}
												</p>
												<p className="text-sm text-neutral-500 dark:text-neutral-400">
													{type}/{extension}
												</p>
											</div>
											<p className="text-sm text-neutral-600 dark:text-white bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded shadow">
												{(f.file.size / 1024).toFixed(2)} KB
											</p>
											<button
												onClick={(e) => {
													e.stopPropagation();
													removeFile(idx);
												}}
												disabled={uploading}
												className="ml-2 text-red-500 hover:text-red-700"
											>
												<IconX size={18} />
											</button>
										</div>

										{f.status !== "idle" && (
											<div className="w-full mt-2 bg-neutral-200 dark:bg-neutral-700 rounded h-2">
												<div
													className={cn("h-full rounded transition-all", {
														"bg-blue-500": f.status === "uploading",
														"bg-green-500": f.status === "done",
													})}
													style={{ width: `${f.progress}%` }}
												></div>
											</div>
										)}
									</motion.div>
								);
							})}

						{!files.length && (
							<motion.div
								layoutId="file-upload"
								variants={mainVariant}
								transition={{ type: "spring", stiffness: 300, damping: 12 }}
								className={cn(
									"relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-12 mt-4 w-full max-w-[4rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
								)}
							>
								{isDragActive ? (
									<p className="text-neutral-600 flex flex-col items-center">
										Drop it
										<IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
									</p>
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
			{files.length > 0 && (
				<div className="flex gap-2 mt-4">
					<Button onClick={simulateUpload} disabled={uploading}>
						Upload All
					</Button>
				</div>
			)}
		</div>
	);
};
