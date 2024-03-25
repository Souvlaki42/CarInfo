"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const deleteUser = async (): Promise<void> => {
	const session = await getSession();
	if (!session)
		throw new Error("You should be logged in to delete your account");

	await db.delete(users).where(eq(users.id, session.user.id));

	redirect("/");
};
