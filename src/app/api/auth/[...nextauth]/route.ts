import { db } from "@/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "@/lib/env";
import type { Adapter } from "next-auth/adapters";

const handler = NextAuth({
	adapter: DrizzleAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
});

export { handler as GET, handler as POST };
