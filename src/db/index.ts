import * as schema from "@/db/schema";
import { env } from "@/lib/env";
import { drizzle as drizzleDev } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "@vercel/postgres";
import { drizzle as drizzleProd } from "drizzle-orm/vercel-postgres";

const queryClient = postgres(env.DATABASE_URL);
const dbDev = drizzleDev(queryClient, { schema });
const dbProd = drizzleProd(sql, { schema });

export const db = process.env.NODE_ENV === "development" ? dbDev : dbProd;
