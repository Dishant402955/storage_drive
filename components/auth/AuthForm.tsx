"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import Link from "next/link";

const AuthFormSchema = (formType: "login" | "register") => {
	return z.object({
		email: z.string().email(),
		fullName:
			formType === "register"
				? z.string().min(2).max(50)
				: z.optional(z.string()),
	});
};

const AuthForm = ({ type }: { type: "login" | "register" }) => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>();

	const formSchema = AuthFormSchema(type);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setError("");
		startTransition(() => {
			console.log(values);
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-col text-center w-96 border-2 p-8 rounded-lg shadow-2xl max-w-[80%]"
			>
				<h1 className="text-2xl font-bold">
					{type === "login" ? "login" : "Register"}
				</h1>

				{type === "register" ? (
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter Your Full name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						disabled={isPending}
					/>
				) : null}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter Your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					disabled={isPending}
				/>

				{error ? <p className="text-destructive">{error}</p> : null}
				<Button type="submit" disabled={isPending}>
					{type === "login" ? "login" : "register"}
				</Button>

				<div>
					<Link href={type === "login" ? "/register" : "login"}>
						<Button variant={"link"} className="cursor-pointer">
							{type === "login"
								? "Don't have An Account?"
								: "Already have An Account ?"}
						</Button>
					</Link>
				</div>
			</form>
		</Form>
	);
};

export default AuthForm;
