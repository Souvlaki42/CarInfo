import { Loader2Icon } from "lucide-react";

export default function LoadingPage() {
  return (
    <section className="container flex h-screen items-center justify-center gap-6 pb-8 pt-6 align-middle md:py-10">
      <Loader2Icon className={"animate-spin"} />
    </section>
  );
}
