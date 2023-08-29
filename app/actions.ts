"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { FormData as AddData } from "@/components/car-form";

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
