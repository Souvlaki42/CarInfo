import { Suspense } from "react";
import { Metadata } from "next";

import { Input } from "@/components/ui/input";
import { CarCard } from "@/components/car-card";
import { SiteHeader } from "@/components/site-header";

import { getSession, passSearch, searchCars } from "../actions";

export const metadata: Metadata = {
  title: "Search Results",
};

export default async function SearchPage({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const session = await getSession(`/search?query=${query}`, true);

  const cars = await searchCars(session.user.id, query);

  return (
    <>
      <SiteHeader session={session} callbackUrl={`/search?query=${query}`} />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div>
          <form action={passSearch}>
            <Input name="searchQuery" placeholder="Search" className="w-full" />
          </form>
        </div>
        <Suspense fallback={<h1 className="text-center">Loading!</h1>}>
          {cars?.length === 0 ? (
            <h1 className="text-center">No cars found!</h1>
          ) : (
            cars?.map((car) => <CarCard key={car.id} car={car} />)
          )}
        </Suspense>
      </section>
    </>
  );
}
