import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { SiteHeader } from "@/components/site-header";

import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Unauthorized",
};

export default async function UnauthorizedPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <SiteHeader session={session} callbackUrl={callbackUrl} />
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-center">Please log in to see this page!</h1>
      </section>
    </>
  );
}