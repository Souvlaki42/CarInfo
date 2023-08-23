import { CarForm } from "@/components/car-form";
import { Car } from "@prisma/client";
import { Metadata } from "next";
import { cache } from "react";
import { ensureAuthenticated, getCar } from "../actions";

const getCachedCar = cache(async (id: string | null) => {
  const car: Car | null = !id || id === "" ? null : await getCar(id);
  return car;
});

export async function generateMetadata({ searchParams: { updateId = "" } }: { searchParams: { updateId: string | null } }): Promise<Metadata> {
  const car = await getCachedCar(updateId);
  return {
    title: !car ? "Add Car" : "Update Car"
  };
}

export default async function AddCarPage({ searchParams: { updateId = "" } }: { searchParams: { updateId: string | null } }) {
  const session = await ensureAuthenticated("/add-car");
  const car = await getCachedCar(updateId);
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <CarForm userId={session.user.id} car={car} />
    </section>
  );
}