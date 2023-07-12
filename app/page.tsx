import { CarCard } from "@/components/car-card";
import { prisma } from "@/lib/db";

export default async function IndexPage() {
  const cars = await prisma.car.findMany();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          engineNumber={car.engineNumber}
          frame={car.frame}
          year={car.year}
        />
      ))}
    </section>
  );
}

