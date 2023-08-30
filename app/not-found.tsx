import { CircleSlashedIcon } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="container flex h-screen flex-col items-center justify-center gap-3 text-xl md:py-10">
      <h1 className="flex flex-row items-center gap-2 text-2xl font-bold uppercase">
        <CircleSlashedIcon />
        404!
      </h1>
      <p className="text-center">Αυτό που ψάχνετε δεν υπάρχει εδώ.</p>
    </section>
  );
}
