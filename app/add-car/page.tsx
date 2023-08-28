import { cache } from "react";
import { Metadata } from "next";
import { AddCarPageProps } from "@/types";
import { Car } from "@prisma/client";

import { useSession } from "@/lib/auth";
import { CarForm } from "@/components/car-form";
import { SiteHeader } from "@/components/site-header";

import { getCar } from "../actions";

const getCachedCar = cache(async (id: string | null) => {
  const car: Car | null = !id || id === "" ? null : await getCar(id);
  return car;
});

export async function generateMetadata({
  searchParams: { updateId = "" },
}: AddCarPageProps): Promise<Metadata> {
  const car = await getCachedCar(updateId);
  return {
    title: !car ? "Προσθήκη" : "Επεξεργασία",
  };
}

export default async function AddCarPage({
  searchParams: { updateId = "" },
}: AddCarPageProps) {
  const session = await useSession(`/add-car?updateId=${updateId}`, true);

  const car = await getCachedCar(updateId);
  return (
    <>
      <SiteHeader
        session={session}
        callbackUrl={`/add-car?updateId=${updateId}`}
      />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <CarForm userId={session.user.id} car={car} />
      </section>
    </>
  );
}
