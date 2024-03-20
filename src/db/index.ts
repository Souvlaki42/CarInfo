import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL ?? "");
const db = drizzle(queryClient, { schema });

export { db };
