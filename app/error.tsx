"use client";

import { ServerCrashIcon } from "lucide-react";

export default function ErrorPage() {
  return (
    <section className="container flex h-screen flex-col items-center justify-center gap-3 text-xl md:py-10">
      <h1 className="flex flex-row items-center gap-2 text-2xl font-bold uppercase">
        <ServerCrashIcon />
        Σφαλμα!
      </h1>
      <p className="text-center">
        Κάτι πήγε στραβά. Προσπαθήστε ξανά αργότερα.
      </p>
    </section>
  );
}
