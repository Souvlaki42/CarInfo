"use server";

import { db } from "@/db";
import { vehicles, Vehicle } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { and, eq, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getVehicles = async (search?: string): Promise<Vehicle[]> => {
	const session = await getSession();
	if (!session) throw new Error("You should be logged in to get vehicles");

	const where = !!search
		? or(
				ilike(vehicles.engineNumber, `%${search}%`),
				ilike(vehicles.frameNumber, `%${search}%`),
				ilike(vehicles.modelYear, `%${search}%`),
				ilike(vehicles.notes, `%${search}%`)
		  )
		: undefined;
	const data = await db.query.vehicles.findMany({
		where: and(eq(vehicles.userId, session.user.id), where),
	});
	return data;
};

export const getVehicle = async (
	vehicleId: string
): Promise<Vehicle | undefined> => {
	const session = await getSession();
	if (!session) throw new Error("You should be logged in to get vehicle by id");

	const data = await db.query.vehicles.findFirst({
		where: and(
			eq(vehicles.userId, session.user.id),
			eq(vehicles.id, vehicleId)
		),
	});

	return data;
};

export const createVehicle = async (
	vehicle: Omit<Vehicle, "id" | "userId">
): Promise<void> => {
	const session = await getSession();

	if (!session) throw new Error("You should be logged in to create a vehicle");

	await db.insert(vehicles).values({ ...vehicle, userId: session.user.id });

	revalidatePath("/vehicles");
};

export const deleteVehicle = async (vehicleId: string): Promise<void> => {
	const session = await getSession();
	if (!session) throw new Error("You should be logged in to delete vehicles");

	const vehicle = await getVehicle(vehicleId);
	if (vehicle?.userId !== session.user.id)
		throw new Error("You are not authorized!");

	await db.delete(vehicles).where(eq(vehicles.id, vehicleId));

	revalidatePath("/vehicles");
};
