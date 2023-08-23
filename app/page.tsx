import { Suspense } from "react";

import { Input } from "@/components/ui/input";
import { CarCard } from "@/components/car-card";
import { PaginationBar } from "@/components/pagination-bar";
import { SiteHeader } from "@/components/site-header";

import { countCars, getCars, getSession, passSearch } from "./actions";

const PAGE_SIZE = 3;

export default async function HomePage({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  const session = await getSession("/", true);

  const currentPage = parseInt(page);
  const totalItemCount = await countCars();

  const totalPages = Math.ceil(totalItemCount / PAGE_SIZE);

  const skipCount = (currentPage - 1) * PAGE_SIZE;

  const cars = await getCars(session.user.id, PAGE_SIZE, skipCount);

  return (
    <>
      <SiteHeader session={session} callbackUrl="/" />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div>
          <form action={passSearch}>
            <Input name="searchQuery" placeholder="Search" className="w-full" />
          </form>
        </div>
        <Suspense
          fallback={<h1 className="text-center">Παρακαλώ περιμένετε...</h1>}
        >
          {cars?.length === 0 ? (
            <h1 className="text-center">Δεν βρέθηκαν καθόλου αυτοκίνητα!</h1>
          ) : (
            cars?.map((car) => <CarCard key={car.id} car={car} />)
          )}
          {totalPages > 1 && (
            <PaginationBar currentPage={currentPage} totalPages={totalPages} />
          )}
        </Suspense>
      </section>
    </>
  );
}

