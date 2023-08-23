import { CarCard } from "@/components/car-card";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ensureAuthenticated, passSearch, searchCars } from "../actions";

export const metadata: Metadata = {
  title: "Search Results"
}

export default async function SearchPage({ searchParams: { query } }: { searchParams: { query: string } }) {
  const session = await ensureAuthenticated(`/search?query=${query}`);

  if (!query || query === "") { 
    revalidatePath("/");
    redirect("/");
  }

  const cars = await searchCars(session.user.id, query);

  return (<>
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
       <div>
      <form action={passSearch}>
        <Input name="searchQuery" placeholder="Search" className="w-full"/>
      </form>
    </div>
      <Suspense fallback={<h1 className="text-center">Loading!</h1>}>
        {cars.length === 0 ? (<h1 className="text-center">No cars found!</h1>) : cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </Suspense>
    </section>
  </>);

}