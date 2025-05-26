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

export const createAccount = async ({
	fullName,
	email,
}: {
	fullName: string | undefined;
	email: string;
}) => {
	const existingUser = await getUserByEmail(email);

	const accountId = await sendEmailOTP({ email });
	if (!accountId) {
		throw new Error("Failed to send an OTP");
	}

	if (!existingUser) {
		const { database } = await createAdminClient();

		await database.createDocument(
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
	}

	return parseStringify({ accountId });
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

		const session = await account.createSession(accountId, password);

		(await cookies()).set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		return parseStringify({ sessionId: session.$id });
	} catch (error) {
		console.log(error);
		throw new Error("Can't Verify Secret, Try Again");
	}
};

export const getCurrentUser = async () => {
	const { database, account } = await createSessionClient();

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

export const signOutUser = async () => {
	const { account } = await createSessionClient();

	try {
		await account.deleteSession("current");
		(await cookies()).delete("appwrite-session");
	} catch (error) {
		console.log("Failed to signout");
		throw new Error("Failed to sign-out User try again");
	}
};
