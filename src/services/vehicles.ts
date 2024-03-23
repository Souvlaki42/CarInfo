"use server";

import { db } from "@/db";
import { vehicles, Vehicle } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export const getVehicles = async (): Promise<Vehicle[]> => {
	noStore();
	const vehicles = await db.query.vehicles.findMany();
	return vehicles;
};

export const createVehicle = async (
	vehicle: Omit<Vehicle, "id" | "userId">
): Promise<void> => {
	const session = await getSession();

	if (!session) throw new Error("You should be logged in to create a vehicle");

	await db.insert(vehicles).values({ ...vehicle, userId: session.user.id });

	revalidatePath("/");
};
