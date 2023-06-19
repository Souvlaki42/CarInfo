import { CarCard } from "@/components/car-card";

export default function IndexPage() {
  const data = [
    {
      id: 1,
      engineNumber: 5151562,
      frame: "yayyay",
      year: 2017,
    },
    {
      id: 2,
      engineNumber: 5256269,
      frame: "hahagsg",
      year: 1986,
    },
    {
      id: 3,
      engineNumber: 4422662,
      frame: "daaghah",
      year: 2002,
    },
  ];
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {data.map((car) => (
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

