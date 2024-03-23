import * as schema from "@/db/schema";
import { env } from "@/lib/env";
import { drizzle as drizzleDev } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(
	process.env.NODE_ENV === "development"
		? env.LOCAL_DATABASE_URL
		: env.PROD_DATABASE_URL
);
export const db = drizzleDev(queryClient, { schema });
