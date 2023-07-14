import { prisma } from "@/lib/db";
import { CarCard } from "@/components/car-card";
import { SearchInput } from "@/components/search-input";

export default async function IndexPage() {
  const cars = await prisma.car.findMany({
    take: 10,
    // orderBy: { updatedAt: "desc" }
  });

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <SearchInput />
      <div className="flex flex-col gap-4">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            engineNumber={car.engineNumber}
            frame={car.frame}
            year={car.year}
          />
        ))}
      </div>
    </section>
  );
}
