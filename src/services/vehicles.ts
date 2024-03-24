"use server";

import { db } from "@/db";
import { vehicles, Vehicle } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { ilike, or } from "drizzle-orm";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export const getVehicles = async (search?: string): Promise<Vehicle[]> => {
	noStore();
	const where = !!search
		? or(
				ilike(vehicles.engineNumber, `%${search}%`),
				ilike(vehicles.frameNumber, `%${search}%`),
				ilike(vehicles.modelYear, `%${search}%`),
				ilike(vehicles.notes, `%${search}%`)
		  )
		: undefined;
	const data = await db.select().from(vehicles).where(where);
	return data;
};

export const createVehicle = async (
	vehicle: Omit<Vehicle, "id" | "userId">
): Promise<void> => {
	const session = await getSession();

	if (!session) throw new Error("You should be logged in to create a vehicle");

	await db.insert(vehicles).values({ ...vehicle, userId: session.user.id });

	revalidatePath("/");
};
