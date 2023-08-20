import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { CreateCarForm, FormData } from "@/components/create-car-form";

async function onSubmit(formData: FormData) {
  "use server";
  const { engineNumber, frame, year } = formData;
  await prisma.car.create({ data: { engineNumber, frame, year } });
  redirect(`/?caching=${Math.random()}`);
}

export default async function CreatePage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <CreateCarForm onSubmit={onSubmit} />
    </section>
  );
}
