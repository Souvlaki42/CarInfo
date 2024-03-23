import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		LOCAL_DATABASE_URL: z.string().url("LOCAL_DATABASE_URL is required!"),
		PROD_DATABASE_URL: z.string().url("PROD_DATABASE_URL is required!"),
		GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required!"),
		GOOGLE_CLIENT_SECRET: z
			.string()
			.min(1, "GOOGLE_CLIENT_SECRET is required!"),
		NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required!"),
		NEXTAUTH_URL: z.string().url().optional(),
	},
	runtimeEnv: {
		LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL,
		PROD_DATABASE_URL: process.env.PROD_DATABASE_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	},
});
