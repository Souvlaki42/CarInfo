"use client";

import { useTransition } from "react";
import Link from "next/link";
import { CarCardProps } from "@/types";
import { PencilIcon, Trash2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteCar } from "@/app/actions";

import { Button, buttonVariants } from "./ui/button";

export function CarCard({ car }: CarCardProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <Card>
        <CardHeader className="py-3 pl-6 sm:pt-6">
          <CardTitle className="flex justify-between">
            Αυτοκίνητο: {car.id}
            <div className="flex gap-x-1 sm:gap-x-2">
              <Link href={`/add-car?updateId=${car.id}`}>
                <div
                  className={buttonVariants({
                    variant: "secondary",
                    size: "icon",
                  })}
                >
                  <PencilIcon className="h-4 w-4" />
                </div>
              </Link>
              <Button
                disabled={isPending}
                variant={"destructive"}
                size={"icon"}
                onClick={async () => {
                  startTransition(async () => await deleteCar(car.id));
                }}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          Αριθμός μηχανής: {car.engineNumber}
          <br />
          Πινακίδα: {car.frame}
          <br />
          Έτος: {car.year}
        </CardContent>
        <CardFooter>
          Τελευταία Αλλαγή:&nbsp;
          <time dateTime={car.updatedAt.toISOString()}>
            {new Date(car.updatedAt).toLocaleString("el-GR")}
          </time>
        </CardFooter>
      </Card>
    </>
  );
}
