"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";

const getUserByEmail = async (email: string) => {
	const { database } = await createAdminClient();

	const result = await database.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal("email", [email])]
	);

	return result.total > 0 ? result.documents[0] : null;
};

const sendEmailOTP = async ({ email }: { email: string }) => {
	const { account } = await createAdminClient();

	try {
		const session = await account.createEmailToken(ID.unique(), email);

		return session.userId;
	} catch (error) {
		console.log(error);
		return { error: "Failed To send Email OTP" };
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
