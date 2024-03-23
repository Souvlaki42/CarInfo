import { env } from "@/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema.ts",
	driver: "pg",
	dbCredentials: {
		connectionString:
			process.env.NODE_ENV === "development"
				? env.LOCAL_DATABASE_URL
				: env.PROD_DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
