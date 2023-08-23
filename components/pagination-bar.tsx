import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export function PaginationBar({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = []; 

  for (let page = minPage; page <= maxPage; page ++) {
    numberedPageItems.push(
      <Link
        href={currentPage === page ? "" : `?page=${page}`}
        key={page}
      >
        <div
        className={`${buttonVariants({ variant: currentPage === page ? "secondary" : "outline", size: "sm" })} rounded-full font-bold ${currentPage === page ? "pointer-events-none cursor-not-allowed" : ""}`}>
          {page}
        </div>
      </Link>
    )
  }

  return (
    <>
      <div className="hidden flex-row items-center justify-center gap-2 sm:flex">
        {numberedPageItems}
      </div>
      <div className="flex flex-row items-center justify-center gap-2 sm:hidden">
      { currentPage > 1 && <Link
        href={`?page=${currentPage - 1}`}
      >
        <div
        className={`${buttonVariants({ variant: "outline", size: "sm" })} select-none rounded-full font-bold`}>
          «
        </div>
      </Link> }
      <Button variant={"secondary"} size={"default"} className="pointer-events-none select-none font-bold">Page {currentPage}</Button>
      { currentPage < totalPages && <Link
        href={`?page=${currentPage + 1}`}
      >
        <div
        className={`${buttonVariants({ variant: "outline", size: "sm" })} select-none rounded-full font-bold`}>
          »
        </div>
      </Link> }
      </div>
    </>
  )
}