import { redirect } from "next/navigation";
import { getServerSession, Session } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function useSession(
  callbackUrl: string | undefined | null,
  authenticated: true
): Promise<Session>;

export async function useSession(
  callbackUrl: string | undefined | null,
  authenticated: false
): Promise<null>;

export async function useSession(
  callbackUrl: string | undefined | null,
  authenticated?: undefined
): Promise<Session | null>;

export async function useSession(
  callbackUrl: string | undefined | null,
  authenticated?: boolean
): Promise<Session | null> {
  const session = await getServerSession(authOptions);

  if (!session && authenticated) {
    redirect(`/unauthorized?callbackUrl=${callbackUrl ?? "/"}`);
  } else if (session && !authenticated) {
    redirect(callbackUrl ?? "/");
  } else {
    return session;
  }
}
