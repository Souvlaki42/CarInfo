import { prisma } from "@/lib/db";
import { CarCard } from "@/components/car-card";
import { SearchInput } from "@/components/search-input";

export const revalidate = 5;

export const dynamic = "force-dynamic";

async function deleteCar(id: string) {
  "use server";
  await prisma.car.delete({ where: { id: id } });
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search: searchQuery } = searchParams;
  let cars;

  if (searchQuery == null || searchQuery == undefined || searchQuery === "") {
    cars = await prisma.car.findMany({
      take: 10,
      orderBy: { updatedAt: "desc" },
    });
  } else {
    cars = await prisma.car.findMany({
      take: 10,
      orderBy: { updatedAt: "desc" },
      where: {
        OR: [
          { frame: { contains: searchQuery } },
          { engineNumber: { contains: searchQuery } },
          { year: { contains: searchQuery } },
        ],
      },
    });
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <SearchInput />
      <div className="flex flex-col gap-4">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            engineNumber={car.engineNumber}
            frame={car.frame}
            year={car.year}
            deleteCar={deleteCar}
          />
        ))}
      </div>
    </section>
  );
}
