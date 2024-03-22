"use server";

import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { Vehicle } from "./form";
import { getSession } from "@/lib/auth";

export const createVehicle = async (vehicle: Vehicle) => {
	const session = await getSession();

	if (!session) throw new Error("You should be logged in to create a vehicle");

	await db.insert(vehicles).values({ ...vehicle, userId: session.user.id });
};
