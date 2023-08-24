import { Car } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export interface HomePageProps {
  searchParams: { page: string | null };
}

export interface AddCarPageProps {
  searchParams: { updateId: string | null };
}

export interface SearchPageProps {
  searchParams: { query: string | null };
}

export interface UnauthorizedPageProps {
  searchParams: { callbackUrl: string | null };
}

export interface CarCardProps {
  car: Car;
}

export interface CarFormProps {
  userId: string;
  car: Car | null;
}

export interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export interface SiteHeaderProps {
  session: Session | null;
  callbackUrl: string;
}
