"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
	const { database } = await createAdminClient();

	const result = await database.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal("email", [email])]
	);

	return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
	const { account } = await createAdminClient();

	try {
		const session = await account.createEmailToken(ID.unique(), email);

		return session.userId;
	} catch (error) {
		console.log(error);
	}
};

export const verifySecret = async ({
	accountId,
	password,
}: {
	accountId: string;
	password: string;
}) => {
	try {
		const { account } = await createAdminClient();

		const session = (await account.createSession(accountId, password)) as any;

		if (session && session?.code === 401) {
			return { error: "Invalid token." };
		}

		if (session.userId) {
			(await cookies()).set("appwrite-session", session.secret, {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "strict",
			});

			return parseStringify({ sessionId: session.$id });
		}
		return { error: "Something went wrong!, try again." };
	} catch (error: any) {
		if (error.code === 401) {
			return { error: "Invalid code!" };
		}
		return { error: "Something  wrong!, try again." };
	}
};

export const getCurrentUser = async () => {
	const res = (await createSessionClient()) as any;

	if (!res?.database || !res?.account) {
		return null;
	}

	const { database, account } = res;

	const result = account.get();

	const user = await database.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal("accountId", (await result).$id)]
	);

	if (user.total <= 0) {
		return null;
	}

	return parseStringify(user.documents[0]);
};

export const createAccount = async ({
	fullName,
	email,
}: {
	fullName: string | undefined;
	email: string;
}) => {
	const existingUser = await getUserByEmail(email);

	if (existingUser?.$id) {
		return { error: "User already exists." };
	}

	const accountId = await sendEmailOTP({ email });

	if (!accountId) {
		return { error: "Failed to send an OTP, try again." };
	}

	if (!existingUser) {
		const { database } = await createAdminClient();

		const res = await database.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			ID.unique(),
			{
				fullName,
				email,
				Avatar:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoCQstoZnSYlNQT8BnZdscCR_RjAKQVedSA&uspq=CAU",
				accountId,
			}
		);

		if (res.$id) {
			return parseStringify({ accountId });
		}
	}

	return { error: "Something went wrong!, try again." };
};

export const loginUser = async ({ email }: { email: string }) => {
	try {
		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			await sendEmailOTP({ email });
			return parseStringify({ accountId: existingUser.accountId });
		}

		return parseStringify({ error: "User not found!" });
	} catch (error) {
		return { error: "Something went wrong please try again" };
	}
};

export const signOutUser = async () => {
	const res = (await createSessionClient()) as any;
	if (!res?.account) {
		return null;
	}
	const { account } = res;

	try {
		await account.deleteSession("current");
		(await cookies()).delete("appwrite-session");
	} catch (error) {
		console.log("Failed to signout");
		throw new Error("Failed to sign-out User try again");
	}
};
