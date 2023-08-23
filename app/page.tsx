import { Suspense } from "react";
import { Car } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { CarCard } from "@/components/car-card";
import { PaginationBar } from "@/components/pagination-bar";
import { SiteHeader } from "@/components/site-header";

import { countCars, ensureAuthenticated, getCars, passSearch } from "./actions";

const PAGE_SIZE = 3;

export default async function HomePage({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  const session = await ensureAuthenticated("/", false);

  let cars: Car[] | null | undefined = [];

  const currentPage = parseInt(page);
  const totalItemCount = await countCars();

  const totalPages = Math.ceil(totalItemCount / PAGE_SIZE);

  const skipCount = (currentPage - 1) * PAGE_SIZE;

  if (!session) {
    cars = await getCars(null, PAGE_SIZE, skipCount);
  } else {
    cars = await getCars(session.user.id, PAGE_SIZE, skipCount);
  }
  return (
    <>
      <SiteHeader session={session} />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        {session && (
          <>
            <div>
              <form action={passSearch}>
                <Input
                  name="searchQuery"
                  placeholder="Search"
                  className="w-full"
                />
              </form>
            </div>
            <Suspense fallback={<h1 className="text-center">Loading!</h1>}>
              {cars?.length === 0 ? (
                <h1 className="text-center">No cars found!</h1>
              ) : (
                cars?.map((car) => <CarCard key={car.id} car={car} />)
              )}
              {totalPages > 1 && (
                <PaginationBar
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </Suspense>
          </>
        )}
      </section>
      {!session && (
        <h1 className="text-center">Please log in to see this page!</h1>
      )}
    </>
  );
}

