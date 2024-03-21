import * as schema from "@/db/schema";
import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient, { schema });

export { db };
