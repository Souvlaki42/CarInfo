"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession, Session } from "next-auth";

import { prisma } from "@/lib/db/prisma";
import { FormData as AddData } from "@/components/car-form";

import { authOptions } from "./api/auth/[...nextauth]/route";

export async function ensureAuthenticated(
  callbackUrl: string,
  authenticate = true
) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session && authenticate)
    redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
  return session as Session;
}

export async function addCar(formData: AddData, userId: string) {
  "use server";
  const { engineNumber, frame, year } = formData;
  await prisma.car.create({
    data: { engineNumber, frame, year, userId: userId },
  });
  revalidatePath("/");
  redirect("/");
}

export async function updateCar(formData: AddData, carId: string) {
  "use server";
  const { engineNumber, frame, year } = formData;
  await prisma.car.update({
    where: { id: carId },
    data: { engineNumber, frame, year },
  });
  revalidatePath("/");
  redirect("/");
}

export async function deleteCar(carId: string) {
  "use server";
  await prisma.car.delete({ where: { id: carId } });
  revalidatePath("/");
  redirect("/");
}

export async function getCar(id: string) {
  "use server";
  return await prisma.car.findUnique({ where: { id: id } });
}

export async function getCars(
  userId: string | null,
  takeCount: number,
  skipCount = 0
) {
  "use server";
  if (!userId) return;
  const data = await prisma.car.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    skip: skipCount,
    take: takeCount,
  });
  return data;
}

export async function countCars() {
  "use server";
  return await prisma.car.count();
}

export async function passSearch(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery");
  if (!searchQuery) return;

  revalidatePath("/search");
  redirect(`/search?query=${searchQuery}`);
}

export async function searchCars(userId: string | null, query: string) {
  "use server";

  if (!userId) return;
  const data = await prisma.car.findMany({
    where: {
      userId,
      OR: [
        { id: { contains: query } },
        { engineNumber: { contains: query } },
        { frame: { contains: query } },
        { year: { contains: query } },
      ],
    },
    orderBy: { updatedAt: "desc" },
  });
  return data;
}
