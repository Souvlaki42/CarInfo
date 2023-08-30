import { Metadata } from "next";
import { SearchPageProps } from "@/types";

import { useSession } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { CarCard } from "@/components/car-card";
import { SiteHeader } from "@/components/site-header";

import { passSearch, searchCars } from "../actions";

export const metadata: Metadata = {
  title: "Αναζήτηση",
};

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const session = await useSession(`/search?query=${query}`, true);

  const cars = await searchCars(session.user.id, query ?? "");

  return (
    <>
      <SiteHeader
        session={session}
        callbackUrl={`/search?query=${query ?? ""}`}
      />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div>
          <form action={passSearch}>
            <Input
              name="searchQuery"
              placeholder="Αναζήτηση..."
              className="w-full"
            />
          </form>
        </div>
        {cars?.length === 0 ? (
          <h1 className="text-center">Δεν βρέθηκαν καθόλου αυτοκίνητα!</h1>
        ) : (
          cars?.map((car) => <CarCard key={car.id} car={car} />)
        )}
      </section>
    </>
  );
}
