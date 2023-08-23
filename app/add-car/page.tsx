import { cache } from "react";
import { Metadata } from "next";
import { Car } from "@prisma/client";

import { CarForm } from "@/components/car-form";
import { SiteHeader } from "@/components/site-header";

import { getCar, getSession } from "../actions";

const getCachedCar = cache(async (id: string | null) => {
  const car: Car | null = !id || id === "" ? null : await getCar(id);
  return car;
});

export async function generateMetadata({
  searchParams: { updateId = "" },
}: {
  searchParams: { updateId: string | null };
}): Promise<Metadata> {
  const car = await getCachedCar(updateId);
  return {
    title: !car ? "Add Car" : "Update Car",
  };
}

export default async function AddCarPage({
  searchParams: { updateId = "" },
}: {
  searchParams: { updateId: string | null };
}) {
  const session = await getSession(`/add-car?updateId=${updateId}`, true);

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