"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { sendEmailOTP, verifySecret } from "@/lib/actions/users.action";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const OTPModel = ({
	email,
	accountId,
}: {
	email: string;
	accountId: string;
}) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(true);
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | undefined>();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		startTransition(async () => {
			e.preventDefault();

			try {
				const sessionId = await verifySecret({ accountId, password });

				if (sessionId.error) {
					toast.error(sessionId.error);
					setError(sessionId.error);
				}
				if (sessionId.sessionId) {
					router.push("/");
				}
			} catch (error) {
				setError("something went wrong!, try again");
				toast.error(
					<p className="text-destructive">Something went wrong!, try again</p>
				);
			}
		});
	};

	const handleResendOTP = async () => {
		await sendEmailOTP({ email });
		toast.success("New OTP sent!");
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className="flex flex-col items-center gap-y-8">
				<AlertDialogHeader className="flex flex-col items-center justify-center max-w-[450px] my-2">
					<AlertDialogTitle className="text-2xl">
						Enter Your OTP
					</AlertDialogTitle>
					<AlertDialogDescription>
						We've sent a code to <span className="font-bold">{email}</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<InputOTP
					maxLength={6}
					disabled={isPending}
					value={password}
					onChange={setPassword}
				>
					<InputOTPGroup className="gap-x-2 my-4">
						<InputOTPSlot index={0} className="border border-black h-12 w-12" />
						<InputOTPSlot index={1} className="border border-black h-12 w-12" />
						<InputOTPSlot index={2} className="border border-black h-12 w-12" />
						<InputOTPSlot index={3} className="border border-black h-12 w-12" />
						<InputOTPSlot index={4} className="border border-black h-12 w-12" />
						<InputOTPSlot index={5} className="border border-black h-12 w-12" />
					</InputOTPGroup>
				</InputOTP>

				<AlertDialogFooter className="p-4  items-center">
					{error ? <p className="text-destructive">{error}</p> : null}
					<AlertDialogAction
						className="w-[90%]"
						onClick={handleSubmit}
						disabled={isPending}
					>
						Submit
					</AlertDialogAction>
					<AlertDialogCancel className="w-[90%]" disabled={isPending}>
						Cancel
					</AlertDialogCancel>

					<div className="mt-4 gap-x-0">
						Didn't Get a code?
						<button
							disabled={isPending}
							onClick={handleResendOTP}
							className="cursor-pointer ml-1 hover:underline hover:underline-offset-2"
						>
							Click here to Resend
						</button>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default OTPModel;
